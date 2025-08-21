import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Color';

// Geo Apify Key
const GEOAPIFY_API_KEY = "ef7d5028843c49fd963b2dad2c3fd8d4"; // <- put your key here

export default function LocateMosque() {
  const [location, setLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [mode, setMode] = useState("walk");
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [travelTimes, setTravelTimes] = useState({}); // store times for all modes
  const mapRef = useRef(null);

  // Destination: example SM City Baguio
  const destination = {
    latitude: 16.4120,
    longitude: 120.5942,
    title: "SM City Baguio",
  };

  // request location once
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Location access is required.");
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (err) {
        console.error("Location error", err);
        Alert.alert("Error", "Could not get location.");
      }
    })();
  }, []);

  // fetch route whenever location or mode changes
  useEffect(() => {
    if (location) {
      fetchRoute(mode);
    }
  }, [location, mode]);

  const fetchRoute = async (selectedMode = mode) => {
    if (!location) return;
    setLoadingRoute(true);
    setRouteCoords([]);
    setTravelTime(null);

    const url = `https://api.geoapify.com/v1/routing?waypoints=${location.latitude},${location.longitude}|${destination.latitude},${destination.longitude}&mode=${selectedMode}&apiKey=${GEOAPIFY_API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data?.features?.length) {
        Alert.alert("No route", "No routing data returned for this route.");
        setLoadingRoute(false);
        return;
      }

      const feat = data.features[0];
      let coords = [];

      if (feat.geometry?.type === "LineString") {
        coords = feat.geometry.coordinates.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
      } else if (feat.geometry?.type === "MultiLineString") {
        coords = feat.geometry.coordinates.flat().map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
      }

      setRouteCoords(coords);

      // Save travel time for marker & buttons
      if (feat.properties) {
        const seconds = feat.properties.time ?? feat.properties.total_time ?? null;
        if (seconds != null) {
          const mins = Math.round(seconds / 60);
          setTravelTime(mins); // marker
          setTravelTimes(prev => ({ ...prev, [selectedMode]: mins })); // per mode
        }
      }

      // Fit map to route
      if (mapRef.current && coords.length > 0) {
        mapRef.current.fitToCoordinates(coords, {
          edgePadding: { top: 80, right: 40, bottom: 200, left: 40 },
          animated: true,
        });
      }
    } catch (err) {
      console.error("fetchRoute error", err);
      Alert.alert("Routing error", "Failed to fetch route.");
    } finally {
      setLoadingRoute(false);
    }
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Getting location...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* User marker */}
        <Marker coordinate={location} title="You" pinColor="blue" />

        {/* Destination marker with time bubble */}
        <Marker coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}>
          <View style={styles.markerContainer}>
            <View style={styles.timeBubble}>
              <Text style={styles.timeText}>{travelTime ? `${travelTime} min` : "..."}</Text>
            </View>
            <View style={styles.pin} />
          </View>
        </Marker>

        {/* polyline */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor="#2eaf66" strokeWidth={4} />
        )}
      </MapView>

      {/* Refresh button */}
      <TouchableOpacity
        style={[styles.refreshBtnContainer, styles.refreshBtn]}
        onPress={() => fetchRoute(mode)}
      >
        <Text style={{ color: Colors.font1 }}>{loadingRoute ? "Loading..." : "Refresh Route"}</Text>
      </TouchableOpacity>

      {/* Mode buttons */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.modeBtn, mode === "drive" && styles.activeMode]}
          onPress={() => { setMode("drive"); fetchRoute("drive"); }}
        >
          <FontAwesome5 name="car-side" size={20} color={mode === "drive" ? "#fff" : Colors.primary} />
          <Text style={[styles.modeText, mode === "drive" && styles.activeText]}>
            {travelTimes.drive ? `${travelTimes.drive}m` : "..."}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeBtn, mode === "motorbike" && styles.activeMode]}
          onPress={() => { setMode("motorbike"); fetchRoute("motorbike"); }}
        >
          <MaterialIcons name="motorcycle" size={20} color={mode === "motorbike" ? "#fff" : Colors.primary} />
          <Text style={[styles.modeText, mode === "motorbike" && styles.activeText]}>
            {travelTimes.motorbike ? `${travelTimes.motorbike}m` : "..."}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeBtn, mode === "bike" && styles.activeMode]}
          onPress={() => { setMode("bike"); fetchRoute("bike"); }}
        >
          <FontAwesome5 name="bicycle" size={20} color={mode === "bike" ? "#fff" : Colors.primary} />
          <Text style={[styles.modeText, mode === "bike" && styles.activeText]}>
            {travelTimes.bike ? `${travelTimes.bike}m` : "..."}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeBtn, mode === "walk" && styles.activeMode]}
          onPress={() => { setMode("walk"); fetchRoute("walk"); }}
        >
          <FontAwesome6 name="person-walking" size={20} color={mode === "walk" ? "#fff" : Colors.primary} />
          <Text style={[styles.modeText, mode === "walk" && styles.activeText]}>
            {travelTimes.walk ? `${travelTimes.walk}m` : "..."}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  controls: {
    position: "absolute",
    bottom: 90,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.font2,
    padding: 12,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  modeBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  activeMode: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  modeText: {
    marginTop: 4,
    fontWeight: "600",
    color: Colors.primary,
  },
  activeText: {
    color: "#fff",
  },
  refreshBtnContainer: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  refreshBtn: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  markerContainer: { alignItems: "center" },
  timeBubble: {
    backgroundColor: "#2eaf66",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
  timeText: { color: "#fff", fontWeight: "700" },
  pin: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#2eaf66",
    marginTop: 4,
  }
});
