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
import { Colors } from './../../../constants/Color';

const { width } = Dimensions.get('window');

export default function EducationDetails() {
  const router = useRouter();
  const { name, description, image, availability } = useLocalSearchParams();

  // Convert `image` param (CSV or single string) into an array
  const imageArray = image
    ? image.split(',').map((img) => img.trim())
    : [];

  // Final array = [dynamic images from params] + [default fallback images]
  const finalImages = [
    ...imageArray,
    require('./../../../assets/images/Education.jpg'),
    require('./../../../assets/images/1789.jpg'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Education Image Carousel */}
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
            paginationStyle={{
              bottom: 5,
            }}
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

        {/* Info Section */}
        <View style={styles.infoTitleContainer}>
          <Text style={styles.infoTitleText}>{name}</Text>
        </View>

        <View style={styles.infoAssets}>
          <Text style={styles.label}>About:</Text>
          <Text style={styles.value}>{description}</Text>
        </View>

        <View style={styles.infoAssets}>
          <Text style={styles.label}>Availability:</Text>
          <Text style={styles.value}>
            {availability ? availability : 'No schedule provided'}
          </Text>
        </View>

        <View style={styles.infoAssets}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>[Contact Number +63]</Text>
        </View>

        <View style={styles.infoAssets}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>[Email Address]</Text>
        </View>

        <View style={styles.infoAssets}>
          <Text style={styles.label}>Social Media:</Text>
          <Text style={styles.value}>[Icons]</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  infoAssets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary_base,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#0000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  infoTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  infoTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#444',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
});
