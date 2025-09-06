// restaurantmenu.jsx
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function RestaurantMenu() {
  const router = useRouter();
  const { name, description, image } = useLocalSearchParams(); // get restaurant info

  // 🍽️ Menu database (different for each restaurant)
  const menus = {
    "Kashmir Biryani Cafe & Restaurant": [
      { name: "Chicken Biryani", description: "Spicy rice with chicken", image: require('../../../assets/images/1789.jpg') },
      { name: "Mutton Curry", description: "Rich mutton curry", image: require('../../../assets/images/1789.jpg') },
      { name: "Chicken Biryani", description: "Spicy rice with chicken", image: require('../../../assets/images/1789.jpg') },
      { name: "Mutton Curry", description: "Rich mutton curry", image: require('../../../assets/images/1789.jpg') },
      { name: "Chicken Biryani", description: "Spicy rice with chicken", image: require('../../../assets/images/1789.jpg') },
      { name: "Mutton Curry", description: "Rich mutton curry", image: require('../../../assets/images/1789.jpg') },
    ],
    "Ali House of Shawarma Halal": [
      { name: "Beef Shawarma", description: "Classic beef shawarma wrap", image: require('../../../assets/images/1789.jpg') },
      { name: "Falafel", description: "Crispy vegetarian falafel", image: require('../../../assets/images/1789.jpg') },
      { name: "Chicken Biryani", description: "Spicy rice with chicken", image: require('../../../assets/images/1789.jpg') },
      { name: "Mutton Curry", description: "Rich mutton curry", image: require('../../../assets/images/1789.jpg') },
    ],
    "Ahmad Brothers Café": [
      { name: "Grilled Chicken", description: "Served with rice", image: require('../../../assets/images/1789.jpg') },
      { name: "Hummus Plate", description: "Chickpea dip with bread", image: require('../../../assets/images/1789.jpg') },
    ],
    "Abonabil Restaurant": [
      { name: "Lamb Kebab", description: "Juicy lamb skewers", image: require('../../../assets/images/1789.jpg') },
      { name: "Vegetable Curry", description: "Mixed veggies in curry", image: require('../../../assets/images/1789.jpg') },
      { name: "Chicken Biryani", description: "Spicy rice with chicken", image: require('../../../assets/images/1789.jpg') },
      { name: "Mutton Curry", description: "Rich mutton curry", image: require('../../../assets/images/1789.jpg') },
      { name: "Chicken Biryani", description: "Spicy rice with chicken", image: require('../../../assets/images/1789.jpg') },
    ],
  };

  // ✅ Pick the correct menu or fallback
  const menuItems = menus[name] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => router.push("tabs/homepage/restaurant")}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.font2} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Welcome to {name}' menus!</Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    fontFamily: "poppins-bold",
    textAlign: "center",
    fontSize: 22,
    color: Colors.font2,
    padding: 13,
  },
  backIcon: {
    position: "absolute",
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
  searchInput: { flex: 1, height: 40 },
  searchIcon: { marginLeft: 10 },
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
  image: { width: '100%', height: 100, borderRadius: 10 },
  name: { fontWeight: 'bold', fontSize: 14, marginTop: 8 },
  desc: { fontSize: 10, color: '#666' },
});
