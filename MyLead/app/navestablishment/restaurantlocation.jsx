import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  UrlTile,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import useLocation from "../hooks/uselocation";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { GEOAPIFY_API_KEY } = Constants.expoConfig.extra;

const RESTAURANT_LOCATIONS = {
  "Halal Bites": { latitude: 16.4023, longitude: 120.596 },
  "Muslim Eats": { latitude: 16.403, longitude: 120.598 },
  "Halal Bites 2": { latitude: 16.404, longitude: 120.6005 },
  "Al-Barkah Diner": { latitude: 16.4055, longitude: 120.6022 },
  "Sultan’s Grill": { latitude: 16.4067, longitude: 120.6041 },
};

const GEOAPIFY_STYLES = { bright: "osm-bright" };
const POLYLINE_COLORS = { bright: "blue" };

function getDistanceMeters(coord1, coord2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371e3;
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function RestaurantLocation() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const { latitude, longitude, errorMsg } = useLocation();

  const [routeCoords, setRouteCoords] = useState([]);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [mode, setMode] = useState("drive");
  const [mapStyle] = useState("bright");
  const [loading, setLoading] = useState(true);
  const [alertShown, setAlertShown] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // <-- NEW

  const mapRef = useRef(null);
  const routeCache = useRef({});

  const restaurantCoords =
    RESTAURANT_LOCATIONS[name] || { latitude: 16.4023, longitude: 120.596 };

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("routeCache");
        if (stored) routeCache.current = JSON.parse(stored);
      } catch (e) {
        console.error("Error loading cache:", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchRoute = async () => {
      setLoading(true);
      const cacheKey = `${mode}_${restaurantCoords.latitude}_${restaurantCoords.longitude}`;

      if (routeCache.current[cacheKey]) {
        const { coords, props, timestamp, origin } = routeCache.current[cacheKey];
        const sameOrigin =
          origin && getDistanceMeters(origin, { latitude, longitude }) < 100;

        if (sameOrigin && Date.now() - timestamp < 5 * 60 * 1000) {
          setRouteCoords(coords);
          setDuration(Math.round(props.time / 60));
          setDistance((props.distance / 1000).toFixed(2));
          setLoading(false);

          if (mapRef.current && coords.length > 0) {
            mapRef.current.fitToCoordinates(
              [{ latitude, longitude }, restaurantCoords, ...coords],
              { edgePadding: { top: 80, right: 80, bottom: 80, left: 80 }, animated: true }
            );
          }
          return;
        }
      }

      const url = `https://api.geoapify.com/v1/routing?waypoints=${latitude},${longitude}|${restaurantCoords.latitude},${restaurantCoords.longitude}&mode=${mode}&apiKey=${GEOAPIFY_API_KEY}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.features || data.features.length === 0) {
          console.warn("No route found for mode:", mode);

          if ((mode === "walk" || mode === "bicycle") && !alertShown) {
            setAlertShown(true);
            Alert.alert(
              "Route not available",
              `No route found for ${mode}. Falling back to driving directions.`
            );
            setMode("drive");
            return;
          }

          setRouteCoords([]);
          setLoading(false);
          return;
        }

        const props = data.features[0].properties;
        let coordsArray = data.features[0].geometry.coordinates;
        if (Array.isArray(coordsArray[0][0])) coordsArray = coordsArray.flat();

        const rawCoords = coordsArray
          .filter((c) => Array.isArray(c) && c.length === 2)
          .map((c) => ({ latitude: c[1], longitude: c[0] }));

        const coords = rawCoords.filter((_, idx) => idx % 5 === 0);

        routeCache.current[cacheKey] = {
          coords,
          props,
          timestamp: Date.now(),
          origin: { latitude, longitude },
        };
        await AsyncStorage.setItem("routeCache", JSON.stringify(routeCache.current));

        setRouteCoords(coords);
        setDuration(Math.round(props.time / 60));
        setDistance((props.distance / 1000).toFixed(2));

        if (mapRef.current && coords.length > 0) {
          mapRef.current.fitToCoordinates(
            [{ latitude, longitude }, restaurantCoords, ...coords],
            { edgePadding: { top: 80, right: 80, bottom: 80, left: 80 }, animated: true }
          );
        }
      } catch (error) {
        console.error("Error fetching route:", error.message);
        setRouteCoords([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchRoute();
  }, [mode, latitude, longitude, name]);

  const handleRefresh = async () => {
    setRefreshing(true);
    routeCache.current = {};
    await AsyncStorage.removeItem("routeCache");
    setMode((prev) => prev); // retrigger route fetch
  };

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!latitude || !longitude) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: (latitude + restaurantCoords.latitude) / 2,
          longitude: (longitude + restaurantCoords.longitude) / 2,
          latitudeDelta: Math.abs(latitude - restaurantCoords.latitude) + 0.05,
          longitudeDelta: Math.abs(longitude - restaurantCoords.longitude) + 0.05,
        }}
      >
        <UrlTile
          urlTemplate={`https://maps.geoapify.com/v1/tile/${GEOAPIFY_STYLES[mapStyle]}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
          maximumZ={20}
          flipY={false}
        />

        <Marker coordinate={{ latitude, longitude }} title="You are here" />
        <Marker coordinate={restaurantCoords} title={name || "Restaurant"} pinColor="green" />

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor={POLYLINE_COLORS[mapStyle] || "blue"}
            strokeWidth={4}
          />
        )}
      </MapView>

      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 10 }]}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <View style={styles.modeRow}>
          {["drive", "walk", "bicycle"].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.button, mode === m && styles.selected]}
              onPress={() => setMode(m)}
            >
              <Ionicons
                name={m === "drive" ? "car" : m === "walk" ? "walk" : "bicycle"}
                size={18}
                color="#fff"
              />
              <Text style={styles.buttonText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { marginTop: 8, position: "relative" }]}
          onPress={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="refresh" size={18} color="#fff" />
              <Text style={styles.buttonText}>Refresh</Text>
            </>
          )}
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator color="#fff" style={{ marginTop: 10 }} />
        ) : (
          duration &&
          distance && (
            <Text style={styles.info}>
              {distance} km • {duration} min
            </Text>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  backButton: {
    position: "absolute",
    left: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  backText: { color: "white", marginLeft: 5, fontSize: 16, fontWeight: "bold" },
  controls: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    alignItems: "center",
  },
  modeRow: {
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    padding: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    marginHorizontal: 4,
    backgroundColor: "#666",
    borderRadius: 6,
    minWidth: 80,
    justifyContent: "center",
  },
  selected: { backgroundColor: "#2eaf66" },
  buttonText: { color: "#fff", marginLeft: 4, fontSize: 12 },
  info: {
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 14,
    marginTop: 10,
  },
});
