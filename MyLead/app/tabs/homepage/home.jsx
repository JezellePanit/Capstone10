import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Color';

export default function Home() {
  const router = useRouter();

  {/* Navigate Cards to Screens */}
  const screens = {
    'Mosques':'tabs/homepage/masjid',
    'Education':'tabs/homepage/education',
    'Muslim Restaurants':'tabs/homepage/restaurant',
  }

  // Images & Cards List
  const cards = [
     {title: 'Mosques', image: require('./../../../assets/images/Masjid.jpg')},
     {title: 'Education', image: require('./../../../assets/images/Education.jpg')},
     {title: 'Muslim Restaurants', image: require('./../../../assets/images/MuslimRestaurant.jpg')},
  ]

  return (
    <SafeAreaView>
      <ScrollView  contentContainerStyle={{ paddingBottom: 80 }}>

      {/* Header */}
      <ImageBackground
        source={require('./../../../assets/images/homebackground.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >

      <View style={styles.content}>
        <Text style={styles.title}>Bismillah,{"\n"}Begin your Journey</Text>
        <Text style={styles.subtitle}>Location: Baguio City, Philippines</Text>
      </View>

      </ImageBackground>
    
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor='#f8f8f8'
            style={styles.searchInput}
          />
        <Ionicons name="search" size={20} color={Colors.font2} style={{paddingRight:10}} />
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cardContainer}>
        {cards.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(screens[item.title])}>
              
            <Image source={item.image} style={styles.cardImage}/>
            <View style={styles.cardLabel}>
              <Text style={styles.cardLabelText}>{item.title}</Text>
              <Ionicons name="navigate" size={18} color={Colors.font2} style={{marginLeft:'auto'}} />
            </View>
          </TouchableOpacity>
        ))}
        </View>
       </ScrollView>
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.font2,
  },
  headerBackground: { 
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  content: {
    zIndex: 1,
    paddingLeft: 25
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 24,
    color: Colors.font2,
  },
  subtitle: {
    fontFamily: 'poppins',
    fontSize: 12,
    color: Colors.font2,
    marginBottom: 10,
  },
  searchWrapper: {
  alignItems: 'center', // ⬅️ this centers the search bar horizontally
},
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom:10
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    color: Colors.font1,
    fontFamily: 'poppins',
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    // backgroundColor: '#eee',
    paddingLeft: 20,
    paddingRight:20,
    paddingTop: 10
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  cardLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
},
  cardLabelText: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.font2,
},

});
