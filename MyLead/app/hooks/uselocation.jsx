import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const useLocation = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was not granted");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      if (coords) {
        console.log("Actual Device Location:", coords);
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      }
    } catch (err) {
      console.error("Error getting location:", err);
      setErrorMsg("Failed to fetch location");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { latitude, longitude, errorMsg };
};

export default useLocation;

const styles = StyleSheet.create({});