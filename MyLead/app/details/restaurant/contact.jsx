import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Color";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Contact() {
  const router = useRouter();
  const { number, email, socials } = useLocalSearchParams();

  // Open external links
  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.header_text}>Contact Us</Text>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => router.push('tabs/homepage/restaurant')}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.font2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        Feel free to reach out to us through the details below. 
        We’d be happy to answer your questions or provide assistance.
      </Text>

      {/* Call */}
      {number && (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress(`tel:${number}`)}
        >
          <Ionicons name="call" size={20} color={Colors.primary} />
          <Text style={styles.value}>{number}</Text>
        </TouchableOpacity>
      )}

      {/* Email */}
      {email && (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress(`mailto:${email}`)}
        >
          <Ionicons name="mail" size={20} color={Colors.primary} />
          <Text style={styles.value}>{email}</Text>
        </TouchableOpacity>
      )}

      {/* Socials */}
      {socials && (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePress(socials)}
        >
          <Ionicons name="logo-facebook" size={20} color={Colors.primary} />
          <Text style={styles.value}>{socials.replace("https://", "")}</Text>
        </TouchableOpacity>
      )}
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
  description: {
    fontSize: 16,
    color: "#555",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "justify",
    lineHeight: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DBFCF0",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  value: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
  },
});
