import * as location from "expo-location";
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const uselocation = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const getUSerLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if(status !== 'granted') {
        setErrorMsg('Permission to location was not granted');
        return;
    }

    let {coords} = await Location.getCurrentPositionAsync();

    if (coords) {
        const { latitude, longitude } = coords;
        console.log("lat and long is", latitude, longitude);
        setLatitude(latitude);
        setLongitude(longitude);
        let response = await location.reverseGeocodeAsync({
            latitude,
            longitude
        })

        console.log('USER LOCATION IS', response)
    }
  }

  useEffect(() => {
    getUSerLocation();
  }, [])
 
  return {latitude, longitude, errorMsg}
}

export default uselocation

const styles = StyleSheet.create({})