import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useJournal } from '../../context/JournalContext';
import type { Category } from '../../types/journal.types';

type CategoryPickerProps = {
  selected: string[];
  onChange: (categories: string[]) => void;
};

export const CategoryPicker = ({
  selected,
  onChange,
}: CategoryPickerProps) => {
  const { categories } = useJournal();

  const toggleCategory = (categoryId: string) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter(id => id !== categoryId)
      : [...selected, categoryId];
    onChange(newSelected);
  };

  const getCategoryStyle = (category: Category) => ({
    ...styles.category,
    backgroundColor: selected.includes(category.id)
      ? category.color
      : 'transparent',
    borderColor: category.color,
  });

  const getTextStyle = (category: Category) => ({
    ...styles.categoryText,
    color: selected.includes(category.id) ? '#fff' : category.color,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={getCategoryStyle(category)}
            onPress={() => toggleCategory(category.id)}
          >
            <Text style={getTextStyle(category)}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  scrollView: {
    flexDirection: 'row',
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
});