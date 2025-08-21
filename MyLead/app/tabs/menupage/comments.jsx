import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/Color';

export default function CommentsFeedback() {
  const router = useRouter();
  const [comments, setComments] = useState([
    {
      id: '1',
      name: 'Aminah',
      title: 'Great App',
      content: 'Very useful to find restaurants!',
      date: '2025-08-06 | 10:00 AM',
    },
    {
      id: '2',
      name: 'Abdul',
      title: 'Feedback',
      content: 'Maybe add more filters.',
      date: '2025-08-06 | 11:00 AM',
    },
  ]);

  const [inputName, setInputName] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const flatListRef = useRef(null);

  const handleSubmit = () => {
    if (
      inputName.trim() === '' ||
      inputTitle.trim() === '' ||
      inputContent.trim() === ''
    )
      return;

    const newComment = {
      id: Date.now().toString(),
      name: inputName,
      title: inputTitle,
      content: inputContent,
      date: new Date().toLocaleString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setInputName('');
    setInputTitle('');
    setInputContent('');

    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, 100);
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentCard}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }} edges={['bottom']}>
      {/* HEADER*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comments & Feedback</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={inputName}
              onChangeText={setInputName}
            />
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={inputTitle}
              onChangeText={setInputTitle}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Write your feedback..."
              multiline
              value={inputContent}
              onChangeText={setInputContent}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  container: { flex: 1, padding: 16 },
  commentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, fontWeight: 'bold', color: '#4CAF50' },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0c14b',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  avatarText: { fontWeight: 'bold' },
  name: { fontSize: 14, fontWeight: '500' },
  content: { marginTop: 4, fontSize: 14, color: '#333' },
  date: { marginTop: 4, fontSize: 12, color: '#888' },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
