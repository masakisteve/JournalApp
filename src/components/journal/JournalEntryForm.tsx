import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CategoryPicker } from './CategoryPicker';
import { Button } from '../common/Button';
import { useJournal } from '../../context/JournalContext';

type EntryFormData = {
  title: string;
  content: string;
  categoryIds: string[];
  createdAt: string;
};

type JournalEntryFormProps = {
  initialValues?: Partial<EntryFormData>;
  onSubmit: (data: EntryFormData) => void;
};

export const JournalEntryForm = ({ 
  initialValues,
  onSubmit,
}: JournalEntryFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialValues?.categoryIds ?? []
  );

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      categoryIds: selectedCategories,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#666"
      />
      <CategoryPicker
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Write your thoughts..."
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor="#666"
        textAlignVertical="top"
      />
      <Button 
        title="Save" 
        onPress={handleSubmit}
        disabled={!title.trim() || !content.trim()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titleInput: {
    fontSize: 24,
    marginBottom: 16,
    padding: 8,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    marginVertical: 16,
    padding: 8,
    minHeight: 200,
    color: '#000',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default JournalEntryForm;