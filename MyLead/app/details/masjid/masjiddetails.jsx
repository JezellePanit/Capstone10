import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { Colors } from '../../../constants/Color';

const { width } = Dimensions.get('window');

export default function MasjidDetails() {
  const router = useRouter();
  const { name, about, imam, prayer, address, image, availability } = useLocalSearchParams();

  // Handle single/multiple image params
  const imageArray = image ? image.split(',').map((img) => img.trim()) : [];

  // Final image array
  const finalImages = [
    ...imageArray,
    require('./../../../assets/images/Masjid.jpg'),
    require('./../../../assets/images/Education.jpg'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={styles.headerTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name
            ? name.split(' ').slice(0, 2).join(' ') +
              (name.split(' ').length > 2 ? '...' : '')
            : ''}
        </Text>
        <TouchableOpacity onPress={() => router.push('tabs/homepage/masjid')} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image Carousel */}
        <View style={styles.profileContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            autoplay
            autoplayTimeout={3}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(179, 172, 172, 0.8)',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  margin: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: Colors.primary,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  margin: 3,
                }}
              />
            }
            paginationStyle={{ bottom: 5 }}
          >
            {finalImages.map((img, index) => (
              <Image
                key={index}
                source={typeof img === 'string' ? { uri: img } : img}
                style={styles.profilePic}
                resizeMode="cover"
              />
            ))}
          </Swiper>
        </View>

        {/* Title */}
        <View style={styles.infoTitleContainer}>
          <Text style={styles.infoTitleText}>{name}</Text>
        </View>

        {/* About */}
        <View style={styles.infoAssets}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.value}>{about}</Text>
        </View>

        {/* Imam */}
        <View style={styles.infoAssets}>
          <Text style={styles.sectionTitle}>Imam</Text>
          <Text style={styles.value}>{imam}</Text>
        </View>

        {/* Prayer */}
        <View style={styles.infoAssets}>
          <Text style={styles.sectionTitle}>Prayer Times</Text>
          <Text style={styles.value}>{prayer}</Text>
        </View>

        {/* Location */}
        <View style={styles.infoAssets}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.value}>{address}</Text>
        </View>

        {/* Availability */}
        <View style={styles.infoAssets}>
          <Text style={styles.sectionTitle}>Opening Hours</Text>
          <Text style={styles.value}>
            {availability ? availability : 'No schedule provided'}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: Colors.primary,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    top: 18,
  },
  headerTitle: {
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    fontSize: 22,
    color: Colors.font2,
    padding: 13,
  },
  scrollContent: { padding: 15 },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
    height: 270,
  },
  wrapper: { borderRadius: 12 },
  profilePic: {
    width: width - 40,
    height: 250,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  infoTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  infoTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoAssets: {
    backgroundColor: '#DBFCF0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    color: '#444',
  },
});
