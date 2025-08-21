import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Color';

export default function Menu() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>More</Text>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.option} onPress={() => router.push('../../auth/sign-in')}>
              <Ionicons name="person-add-outline" size={20} color="#2eaf66" />
              <Text style={styles.optionText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* General Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>

            <TouchableOpacity style={styles.option} onPress={() => router.push('tabs/menupage/about')}>
              <Ionicons name="information-circle-outline" size={20} color="#2eaf66" />
              <Text style={styles.optionText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push('tabs/menupage/chatscreen')}>
              <Ionicons name="headset-outline" size={20} color="#2eaf66" />
              <Text style={styles.optionText}>Customer Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => router.push('tabs/menupage/comments')}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#2eaf66" />
              <Text style={styles.optionText}>Comments and Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'poppins-bold',
  },
  section: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});