import React from 'react';
import { View, StyleSheet } from 'react-native';
import { JournalEntryForm } from '../../components/journal/JournalEntryForm';
import { useJournal } from '../../context/JournalContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export const EditEntryScreen = () => {
  const { updateEntry } = useJournal();
  const navigation = useNavigation();
  const route = useRoute();
  const { entry } = route.params;

  const handleSubmit = async (entryData) => {
    try {
      await updateEntry(entry.id, entryData);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update entry:', error);
      // Handle error (show alert, etc.)
    }
  };

  return (
    <View style={styles.container}>
      <JournalEntryForm 
        initialValues={entry}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});