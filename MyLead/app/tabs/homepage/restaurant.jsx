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

export default function Restaurant() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const restaurantData = [
    {
      name: 'Kashmir Biryani Cafe & Restaurant',
      about: 'First ever restaurant in tahfckmscka',
      representative: 'Mr. Tingquelita',
      address: 'Abanao St, Baguio, 2600 Benguet',
      availability: 'Mon–Fri, 7am–4pm',
      availability: 'Open 5AM - 9PM',
      number: '+63 912 755 3657',
      email: 'info@kashmir.com',
      socials: 'facebook.com',
      image: require('./../../../assets/images/restaurant1.jpg'),
      coords: { lat: 16.41, lon: 120.59 },
    },
    {
      name: 'Ali House of Shawarma Halal',
      about: 'First ever restaurant in tahfckmscka',
      representative: 'Mr. Gantipulo',
      address: '183 Upper Bonifacio St, Baguio, 2600 Benguet',
      availability: 'Working Hours',
      availability: 'Open 5AM - 9PM',
      number: '+63 983 825 8637',
      email: 'info@alihouse.com',
      socials: 'facebook.com',
      image: require('./../../../assets/images/restaurant2.webp'),
      coords: { lat: 16.418, lon: 120.598 },
    },
    {
      name: 'Ahmad Brothers Café',
      about: 'First ever restaurant in tahfckmscka',
      representative: 'Ms. Filisuella',
      address: '#4, Purok 1, Brgy Happy Homes, Old Lucban, Magsaysay Ave, Baguio, Benguet',
      availability: 'Working Hours',
      availability: 'Open 5AM - 9PM',
      number: '+63 983 825 8637',
      email: 'info@ahmadbrothers.com',
      socials: 'facebook.com',
      image: require('./../../../assets/images/restaurant3.webp'),
      coords: { lat: 16.41, lon: 120.59 },
    },
    {
      name: 'Abonabil Restaurant',
      about: 'First ever restaurant in tahfckmscka',
      representative: 'Ms. Ganda',
      address: '237 Upper Bonifacio St, Baguio, 2600 Benguet',
      availability: 'Working Hours',
      availability: 'Open 5AM - 9PM',
      number: '+63 983 825 8637',
      email: 'info@abonabil.com',
      socials: 'facebook.com',
      image: require('./../../../assets/images/restaurant4.webp'),
      coords: { lat: 16.415, lon: 120.595 },
    },
  ];

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
        <TouchableOpacity style={styles.backIcon} onPress={() => router.push('tabs/homepage/home')}>
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
                pathname: 'details/restaurant/restaurantdetails',
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
            </View>

            <Text style={styles.desc}>{item.address}</Text>
            <Text style={styles.hours}>{item.availability}</Text>
          </TouchableOpacity>
        ))}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 👈 keeps name aligned left
    marginTop: 10,
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
});
