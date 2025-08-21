import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import * as Location from 'expo-location';   // ✅ FIXED: Added import
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Color';

export default function Masjid() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // 👉 Geoapify API Key
  const GEOAPIFY_API_KEY = 'ef7d5028843c49fd963b2dad2c3fd8d4';

  // ✅ Get user's current location
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    };
  };

  // ✅ Fetch walking directions from Geoapify
  const getDirections = async (from, to) => {
    const url = `https://api.geoapify.com/v1/routing?waypoints=${from.lat},${from.lon}|${to.lat},${to.lon}&mode=walk&apiKey=${GEOAPIFY_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  // 👉 Static mosque list
  const masjidData = [
    {
      name: 'Mosque 1',
      description: 'Baguio City',
      availability: 'Open 5AM - 9PM',
      image: require('../../../assets/images/1789.jpg'),
    },
    {
      name: 'Mosque 2',
      description: 'La Trinidad',
      availability: 'Open 6AM - 8PM',
      image: require('../../../assets/images/1789.jpg'),
    },
    {
      name: 'Mosque 3',
      description: 'Benguet',
      availability: '24/7',
      image: require('../../../assets/images/1789.jpg'),
    },
    {
      name: 'Mosque 4',
      description: 'Pangasinan',
      availability: 'Closed on Fridays',
      image: require('../../../assets/images/1789.jpg'),
    },
  ];

  // ✅ Filter masjid list based on search
  const filteredMasjid = masjidData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.availability.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.header_text}>Mosque</Text>    
        <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.font2} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search mosque..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
      </View>

      {/* Mosque Cards List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredMasjid.length > 0 ? (
          filteredMasjid.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: 'tabs/homepage/masjiddetails',
                  params: {
                    ...item,
                    image: Image.resolveAssetSource(item.image).uri,
                  },
                })
              }
            >
              <Image source={item.image} style={styles.image} />

              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.iconGroup}>
                  {/* Navigate Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.secondary,
                      width: 100,
                      borderRadius: 10,
                      padding: 3,
                    }}
                    onPress={async () => {
                      console.log('Locate icon pressed');
                      const userLocation = await getUserLocation();
                      if (!userLocation) return;

                      const mosqueLocation = {
                        lat: 16.409044,  // You can make this dynamic if needed
                        lon: 120.600258,
                      };

                      const directions = await getDirections(userLocation, mosqueLocation);
                      console.log('Fetched directions:', directions);

                      if (!directions || !directions.features || directions.features.length === 0) {
                        alert('No directions found.');
                        return;
                      }

                      // Navigate to map view and pass parameters
                      router.push({
                        pathname: '../../navestablishment/locatemosque',
                        params: {
                          from: JSON.stringify(userLocation),
                          to: JSON.stringify(mosqueLocation),
                          route: JSON.stringify(directions),
                        },
                      });
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="location-sharp" size={20} color={Colors.font2} />
                      <Text style={{ color: Colors.font2, marginLeft: 4 }}> Navigate </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Information */}
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.hours}>{item.availability}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
            No results found.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.font2,
  },
  header: {
    backgroundColor: Colors.primary,
  },
  header_text: {
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    fontSize: 22,
    color: Colors.font2,
    padding: 13,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    margin: 15,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  desc: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
  },
  hours: {
    fontSize: 12,
    color: '#666',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flex: 1,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
