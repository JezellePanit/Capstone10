import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import uselocation from '../hooks/uselocation';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const GEOAPIFY_API_KEY = 'ef7d5028843c49fd963b2dad2c3fd8d4';

// Example static restaurant location (replace with DB value later)
// Add all your restaurant coordinates here
const RESTAURANT_LOCATIONS = {
  'Halal Bites': {
    latitude: 16.4023,
    longitude: 120.5960,
  },
  'Muslim Eats': {
    latitude: 16.4030,
    longitude: 120.5980,
  },
  'Halal Bites 2': {
    latitude: 16.4040,
    longitude: 120.6005,
  },
  'Al-Barkah Diner': {
    latitude: 16.4055,
    longitude: 120.6022,
  },
  'Sultan’s Grill': {
    latitude: 16.4067,
    longitude: 120.6041,
  },
};

export default function RestaurantLocation({ route }) {
  const { name } = useLocalSearchParams();
  const { latitude, longitude, errorMsg } = uselocation();
  const [routeCoords, setRouteCoords] = useState([]);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [mode, setMode] = useState('drive');
  const [mapType, setMapType] = useState('standard');

  // Get restaurant coordinates (or default)
  const restaurantCoords =
    RESTAURANT_LOCATIONS[name] || { latitude: 16.4023, longitude: 120.5960 };

  // Fetch route from user to restaurant
  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchRoute = async () => {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${latitude},${longitude}|${restaurantCoords.latitude},${restaurantCoords.longitude}&mode=${mode}&apiKey=${GEOAPIFY_API_KEY}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.features?.length > 0) {
          const coords = data.features[0].geometry.coordinates.map(c => ({
            latitude: c[1],
            longitude: c[0],
          }));
          setRouteCoords(coords);
          const props = data.features[0].properties;
          setDuration(Math.round(props.time / 60)); // minutes
          setDistance((props.distance / 1000).toFixed(2)); // km
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, [mode, latitude, longitude]);

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!latitude || !longitude) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        mapType={mapType}
        initialRegion={{
          latitude: (latitude + restaurantCoords.latitude) / 2,
          longitude: (longitude + restaurantCoords.longitude) / 2,
          latitudeDelta: Math.abs(latitude - restaurantCoords.latitude) + 0.05,
          longitudeDelta: Math.abs(longitude - restaurantCoords.longitude) + 0.05,
        }}
      >
        {/* User location */}
        <Marker coordinate={{ latitude, longitude }} title="You are here" />

        {/* Restaurant location */}
        <Marker coordinate={restaurantCoords} title={name || 'Restaurant'} pinColor="green" />

        {/* Route polyline */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor="blue" strokeWidth={4} />
        )}
      </MapView>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.modeRow}>
          {['drive', 'walk', 'bicycle'].map(m => (
            <TouchableOpacity
              key={m}
              style={[styles.button, mode === m && styles.selected]}
              onPress={() => setMode(m)}
            >
              <Ionicons
                name={m === 'drive' ? 'car' : m === 'walk' ? 'walk' : 'bicycle'}
                size={18}
                color="#fff"
              />
              <Text style={styles.buttonText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.modeRow}>
          {['standard', 'satellite', 'terrain'].map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.button, mapType === type && styles.selected]}
              onPress={() => setMapType(type)}
            >
              <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {duration && distance && (
          <Text style={styles.info}>
            {distance} km • {duration} min
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  modeRow: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    padding: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    marginHorizontal: 4,
    backgroundColor: '#666',
    borderRadius: 6,
  },
  selected: {
    backgroundColor: '#2eaf66',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
  },
  info: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 14,
  },
});

