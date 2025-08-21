import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import React from 'react';

export default function RestaurantMenu() {
    const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Menu */}
      <View style={styles.header}>

        {/* NAPIPINDOT UNG BACK BUTTON*/}
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Assalamualaikum</Text>

      {/* Menu Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

     {/* Bottom Navigation 
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Ionicons name="location-outline" size={24} color="#fff" />
        <TouchableOpacity onPress={() => router.push('Settings')}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View> */}

    </SafeAreaView>
  );
}

{/* ITO UNG DATA NA NASA MENU CONTAINERS*/}
const menuItems = [
  {
    name: 'Chicken Curry',
    description: 'nyumamma',
    image: require('./../../../assets/images/1789.jpg'),
  },
  {
    name: 'Chicken Burger',
    description: 'bergerr',
    image: require('./../../../assets/images/1789.jpg'),
  },
  {
    name: 'Broccoli Lasagna',
    description: 'slurpp',
    image: require('./../../../assets/images/1789.jpg'),
  },
  {
    name: 'Mexican Appetizer',
    description: 'Yummyy',
    image: require('./../../../assets/images/1789.jpg'),
  },
  {
    name: 'Spicy Chicken',
    description: 'sarapp',
    image: require('./../../../assets/images/1789.jpg'),
  },
  {
    name: 'Shakes',
    description: 'wowww',
    image: require('./../../../assets/images/1789.jpg'),
  },
];

{/* PROPERTIES/STYLE UNG MGA DESIGN- JS*/}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
},

  header: {
    backgroundColor: Colors.primary,
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    position: 'absolute',
    left: 0,
    right: 0,
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

  greeting: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2eaf66',
    fontWeight: 'bold',
    marginVertical: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },

  card: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    elevation: 3,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },

  desc: {
    fontSize: 10,
    color: '#666',
  },
});