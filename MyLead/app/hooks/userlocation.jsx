import { StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'

const userlocation = () => {

  // DISPLAY BAGUIO CITY
  const INITIAL_REGION = {
    latitude: 16.4023,        
    longitude: 120.5960,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  return (
    <SafeAreaView style={{flex: 1}}>  

      {/* DISPLAY MAP   */}
    <MapView 
      style={{flex: 1}}
      provider={PROVIDER_GOOGLE} // Temporary until issue is okay 
      initialRegion={INITIAL_REGION}

      showsUserLocation
      showsMyLocationButton
    />
    </SafeAreaView>
  )
}

export default userlocation

const styles = StyleSheet.create({
})