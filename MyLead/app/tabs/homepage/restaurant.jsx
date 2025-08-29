import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

// Local restaurant dataset
const restaurantData = [
  {
    name: 'Halal Bites',
    description: 'Delicious Halal food served fresh.',
    availability: 'Mon–Fri, 7am–4pm',
    image: require('./../../../assets/images/1789.jpg'),
    coords: { latitude: 16.4023, longitude: 120.5960 },
  },
  {
    name: 'Muslim Eats',
    description: 'Authentic Muslim cuisine.',
    availability: 'Working Hours',
    image: require('./../../../assets/images/1789.jpg'),
    coords: { latitude: 16.4030, longitude: 120.5980 },
  },
  {
    name: 'Halal Bites 2',
    description: 'Tasty meals for everyone.',
    availability: 'Working Hours',
    image: require('./../../../assets/images/1789.jpg'),
    coords: { latitude: 16.4040, longitude: 120.6005 },
  },
  {
    name: 'Muslim Eats 2',
    description: 'Freshly made traditional dishes.',
    availability: 'Working Hours',
    image: require('./../../../assets/images/1789.jpg'),
    coords: { latitude: 16.4055, longitude: 120.6022 },
  },
];

export default function Restaurant() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Filter the list based on search
  const filteredRestaurant = restaurantData.filter((item) => {
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
        <Text style={styles.header_text}>Muslim Restaurant</Text>
        <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.font2} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search restaurant..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
      </View>

      {/* Restaurant List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredRestaurant.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: 'tabs/homepage/restaurantdetails',
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

              {/* Button Group */}
              <View style={styles.iconGroup}>
                {/* Menu button */}
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() =>
                    router.push({
                      pathname: 'tabs/homepage/restaurantmenu',
                      params: {
                        name: item.name,
                        description: item.description,
                        image: Image.resolveAssetSource(item.image).uri,
                      },
                    })
                  }
                >
                  <Ionicons name="fast-food" size={20} color={Colors.font2} />
                  <Text style={styles.buttonText}>Menu</Text>
                </TouchableOpacity>

                {/* Navigate button */}
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={() =>
                    router.push({
                      pathname: '../../navestablishment/restaurantlocation',
                      params: {
                        name: item.name,
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        description: item.description,
                        image: Image.resolveAssetSource(item.image).uri,
                      },
                    })
                  }
                >
                  <Ionicons name="location-sharp" size={20} color={Colors.font2} />
                  <Text style={styles.buttonText}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.hours}>{item.availability}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.font2 },
  header: { backgroundColor: Colors.primary },
  header_text: {
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    fontSize: 22,
    color: Colors.font2,
    padding: 13,
  },
  backIcon: { position: 'absolute', left: 20, top: 18 },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    margin: 15,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchInput: { flex: 1, height: 40 },
  searchIcon: { marginLeft: 10 },
  listContainer: { paddingHorizontal: 15, paddingBottom: 100 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
  },
  image: { width: '100%', height: 190, borderRadius: 10 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16, flexShrink: 1 },
  desc: { fontSize: 12, color: '#666', marginVertical: 5 },
  hours: { fontSize: 12, color: '#666' },
  iconGroup: { flexDirection: 'row', alignItems: 'center' },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
    alignItems: 'center',
  },
  navigateButton: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: 'center',
  },
  buttonText: { color: Colors.font2, marginLeft: 4 },
});
