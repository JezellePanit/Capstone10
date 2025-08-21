import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Color';

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: About */}
      <View style={styles.header}>

        {/* NAPIPINDOT UNG BACK BUTTON*/}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Developers</Text>
          <Text style={styles.paragraph}>
            lksjdf;aoifvblkjdmfvl;asdgv
            asdkl;gnv;jkladf
            asldjfgk;ajsdgfvadfgffsfb
            AFKSLWFKSDLGVDSDGADPIORGJIOADFGAFDLLFSDLKSDFSDF
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The NCMF</Text>
          <Text style={styles.paragraph}>
            With the signing of Republic Act 9997 (otherwise known as the Act Creating the National Commission on Muslim Filipinos) last February 18, 2010, the government has indeed re-affirmed its belief on the importance of the active participation of the Muslim Filipinos in nation building with due regard for their beliefs, customs, traditions, institutions, and aspirations.
          </Text>
          <Text style={styles.paragraph}>
            In this Act, the Commission shall serve the following functions:
            {'\n\n'}
            a. Advise the President on the formulation, coordination, implementation, and monitoring of policies, plans, programs and projects affecting Muslim Filipino communities.
            {'\n\n'}
            b. Act as the primary government agency through which Muslim Filipinos could seek government assistance and through which such assistance may be extended.
            {'\n\n'}
            c. Monitor and evaluate the performance of all existing policies and development programs of the government that seek to strengthen and uplift the socio-economic conditions of Muslim Filipinos.
            {'\n\n'}
            d. Provide legal and technical services for the survey, adjudication, titling, and development of Muslim Filipino ancestral lands.
          </Text>

          {/* NAPIPINDOT UNG LINK */}          
          <TouchableOpacity
            onPress={() => Linking.openURL('https://ncmf.gov.ph/')}
            style={styles.linkContainer}
          >
            <Ionicons name="link-outline" size={16} color="#2eaf66" />
            <Text style={styles.linkText}>https://ncmf.gov.ph/</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  scrollContent: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#2eaf66',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10, 
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#2eaf66',
    textDecorationLine: 'underline',
  },
});
