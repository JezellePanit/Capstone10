import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Color";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const flatListRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'support',
        text: 'Hello! How can we help you today? Please describe your problem.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  const handleSend = () => {
    if (text.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (text.toLowerCase().includes('problem')) {
      const ticketMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        text: 'We have created a support ticket for your issue. You will receive updates here.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setTimeout(() => {
        setMessages((prev) => [...prev, ticketMessage]);
      }, 500);
    }

    if (text.toLowerCase().includes('solved')) {
      setTimeout(() => {
        Alert.alert(
          'Problem Solved?',
          'Did this solve your problem?',
          [
            { text: 'Not Yet', style: 'cancel' },
            { text: 'Yes, Solved', onPress: () => console.log('Problem marked solved') },
          ]
        );
      }, 500);
    }

    setText('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Support</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageContainer,
                    item.sender === 'user' ? styles.userMessage : styles.supportMessage
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.sender === 'user' ? styles.userText : styles.supportText
                    ]}
                  >
                    {item.text}
                  </Text>
                  <Text style={styles.messageTime}>{item.time}</Text>
                </View>
              )}
              contentContainerStyle={[styles.messagesList, { paddingBottom: 80 }]}
            />
            

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Write here..."
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={{ color: 'white' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  keyboardAvoid: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesList: {
    paddingVertical: 10,
  },
  messageContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 10,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: Colors.primary_base,
    alignSelf: 'flex-end',
  },
  supportMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#000',
  },
  supportText: {
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});

