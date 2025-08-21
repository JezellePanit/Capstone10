import React, { useEffect, useState  } from 'react';
import { useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './../constants/Color';

export default function LandingPage() {
  const router = useRouter();
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const checkTerms = async () => {
      const accepted = await AsyncStorage.getItem('termsAccepted');
      if (!accepted) {
        setShowTerms(false); // Will only show when "Lead Me" is pressed
      }
    };
    checkTerms();
  }, []);

  const handleLeadMe = async () => {
    const accepted = await AsyncStorage.getItem('termsAccepted');
    if (accepted) {
      router.push('/tabs/homepage/home');
    } else {
      setShowTerms(true);
    }
  };

  const handleAgree = async () => {
    await AsyncStorage.setItem('termsAccepted', 'true');
    setShowTerms(false);
    router.push('/tabs/homepage/home');
  };

  return (
    <ImageBackground
      source={require('./../assets/images/Landing_Background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.dim} />

      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('./../assets/images/MyLead_Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Button */}
        <TouchableOpacity onPress={handleLeadMe} style={styles.button}>
          <Text style={styles.buttonText}>Lead Me &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Terms & Conditions Modal */}
      <Modal visible={showTerms} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scroll}>
              <Text style={styles.header}>My Lead - Terms and Conditions</Text>
              <Text style={styles.text}>
                Welcome to My Lead. By using our application, you agree to the following:
                {"\n\n"}1. **Data Collection and Usage** - My Lead collects only the
                information you voluntarily provide (e.g., leads data, contact details).
                This information is securely stored and will not be sold or shared without
                your consent, except where required by law.
                {"\n\n"}2. **Permissions** - The app may request access to your device's
                storage, camera, or location solely for features that require them. You can
                deny these permissions, but some functionalities may be limited.
                {"\n\n"}3. **User Responsibility** - You are responsible for the accuracy of
                data you provide and must ensure it does not violate any laws or third-party
                rights.
                {"\n\n"}4. **Security** - We implement industry-standard measures to protect
                your data. However, we cannot guarantee 100% protection against
                unauthorized access.
                {"\n\n"}5. **Updates** - We may update these terms at any time. Continued use
                of the app means you accept the updated terms.
                {"\n\n"}If you do not agree, you should close and uninstall the application.
              </Text>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: Colors.primary }]}
                onPress={handleAgree}
              >
                <Text style={styles.modalButtonText}>I Agree</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'gray' }]}
                onPress={() => setShowTerms(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1,
  },
  container: {
    zIndex: 2,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 500,
    height: 140,
    marginBottom: 20,
    marginTop: 210,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: Colors.font2,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  scroll: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
