import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // 👈 import this
import { SafeAreaView } from 'react-native-safe-area-context';

const GEOAPIFY_API_KEY = 'ef7d5028843c49fd963b2dad2c3fd8d4';

export default function Locate() {
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocationCoords({ latitude, longitude });

      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.features.length > 0) {
          setAddress(data.features[0].properties);
        } else {
          setErrorMsg('No address found');
        }
      } catch (err) {
        setErrorMsg('Failed to fetch address');
      }
    })();
  }, []);

  if (errorMsg) return <Text>{errorMsg}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {locationCoords ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: locationCoords.latitude,
              longitude: locationCoords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Marker coordinate={locationCoords} title="You are here" />
          </MapView>

          {address && (
            <View style={styles.info}>
              <Text style={styles.text}>City: {address.city}</Text>
              <Text style={styles.text}>Street: {address.street}</Text>
              <Text style={styles.text}>Country: {address.country}</Text>
            </View>
          )}
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2, // bigger map
  },
  info: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
});
