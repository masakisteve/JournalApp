import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { format } from 'date-fns';
import type { JournalEntry } from '../../types/journal.types';
import { useJournal } from '../../context/JournalContext';

type JournalEntryCardProps = {
  entry: JournalEntry;
  onPress: () => void;
};

export const JournalEntryCard = ({
  entry,
  onPress,
}: JournalEntryCardProps) => {
  const { categories } = useJournal();

  const entryCategories = categories.filter(category =>
    entry.categoryIds.includes(category.id)
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.date}>
          {format(new Date(entry.createdAt), 'MMM d, yyyy')}
        </Text>
      </View>
      
      <Text style={styles.preview} numberOfLines={2}>
        {entry.content}
      </Text>

      <View style={styles.categories}>
        {entryCategories.map(category => (
          <View
            key={category.id}
            style={[styles.category, { backgroundColor: category.color }]}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  preview: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  category: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});