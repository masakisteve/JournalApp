import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { CategoryPicker } from '../../components/journal/CategoryPicker';
import { useJournal } from '../../context/JournalContext';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext'; // Add this import

export const NewEntryScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { createEntry } = useJournal();
  const { user } = useAuth(); // Get the current user
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    const now = new Date().toISOString();
    
    try {
      await createEntry({
        title,
        content,
        categoryIds: selectedCategories,
        tags: [], // Add empty tags array
        createdAt: now,
        updatedAt: now, // Add updatedAt
        userId: user?.id || '', // Add userId from auth context
      });
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create entry:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <CategoryPicker
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />
      <Input
        label="Content"
        value={content}
        onChangeText={setContent}
        placeholder="Write your thoughts..."
        multiline
        style={styles.contentInput}
      />
      <Button
        title="Save Entry"
        onPress={handleSubmit}
        loading={loading}
        disabled={!title || !content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
});