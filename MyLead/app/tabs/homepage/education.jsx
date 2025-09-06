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

export default function Education() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data (replace later with DB)
  const educationData = [
    {
      name: 'Almaarif Educational Center inc.',
      about: 'First ever school in tahfckmscka',
      representative: 'Mr. Enrique Gilas',
      address: '7 Roman Ayson Rd, Baguio, 2600 Benguet',
      availability: 'Mon–Fri, 8am–5pm',
      number: '+63 963 628 6483',
      email: 'info@education.com',
      socials: 'facebook.com',
      image: require('../../../assets/images/education1.webp'),
      coords: { lat: 16.4156, lon: 120.58853 },
    },
    {
      name: 'DISCOVER ISLAM',
      about: 'First ever school in tahfckmscka',
      representative: 'Mr. Gaduwino Galaw',
      address: '1282 Zandueta St, Baguio, Benguet',
      availability: 'Mon–Sat, 9am–6pm',
      number: '+63 943 825 9267',
      email: 'info@discoverislam.com',
      socials: 'facebook.com',
      image: require('../../../assets/images/education2.webp'),
      coords: { lat: 16.3983, lon: 120.5844 },
    },
  ];

  // ✅ Filter the list based on search
  const filteredEducation = educationData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query) ||
      item.availability.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.header_text}>Education</Text>
        <TouchableOpacity style={styles.backIcon} onPress={() => router.push('tabs/homepage/home')}>
          <Ionicons name="chevron-back" size={24} color={Colors.font2} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search education..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
      </View>

      {/* Education Cards */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredEducation.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: 'details/education/educationdetails',
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

            {/* Information */}
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
  },
});
