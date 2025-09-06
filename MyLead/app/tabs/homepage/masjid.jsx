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

export default function Masjid() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // 👉 Static mosque list
  const masjidData = [
    {
      name: 'Baguio Grand Mosque',
      about: 'First ever church in tahfckmscka',
      prayer: 'monday 10-2 and friday 5-7pm',
      imam: 'Brother Jose',
      address: 'CH8Q+774, Sepic Rd, Baguio, Benguet',
      availability: 'Open 5AM - 9PM',
      number: '+63 983 825 8637',
      email: 'info@grandmosque.com',
      socials: 'facebook.com',
      image: require('../../../assets/images/mosque1.webp'),
      coords: { lat: 16.4156, lon: 120.5882 },
    },
    {
      name: 'Ahmad Brothers Mosque',
      about: 'First ever church in tahfckmscka',
      prayer: 'monday 10-2 and friday 5-7pm',
      imam: 'Brother Jose',
      address: '004-b purok 1 New Lucban Rd, Baguio, Benguet',
      availability: 'Open 6AM - 8PM',
      number: '+63 954 964 1425',
      email: 'info@ahmadbrothers.com',
      socials: 'facebook.com',
      image: require('../../../assets/images/restaurant3.webp'),
      coords: { lat: 16.4258, lon: 120.5942 },
    },
    {
      name: 'Masjid muhajjarrin',
      about: 'First ever church in tahfckmscka',
      prayer: 'monday 10-2 and friday 5-7pm',
      imam: 'Brother Jose',
      address: 'Lower Rock Quarry, Baguio, Benguet',
      availability: '24/7',
      number: '+63 956 957 2346',
      email: 'info@muhajjarin.com',
      socials: 'facebook.com',
      image: require('../../../assets/images/mosque3.webp'),
      coords: { lat: 16.4279, lon: 120.5854 },
    },
    {
      name: 'Masjid Addabl',
      about: 'First ever church in tahfckmscka',
      prayer: 'monday 10-2 and friday 5-7pm',
      imam: 'Brother Jose',
      address: '9HXM+8Q6, Baguio, Benguet',
      availability: 'Closed on Fridays',
      number: '+63 963 274 5723',
      email: 'info@addabl.com',
      socials: 'facebook.com',
      image: require('../../../assets/images/mosque4.webp'),
      coords: { lat: 16.3983, lon: 120.5844 },
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
        <TouchableOpacity style={styles.backIcon} onPress={() => router.push('tabs/homepage/home')}>
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
                  pathname: 'details/masjid/masjiddetails',
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
});
