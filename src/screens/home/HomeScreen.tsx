import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useJournal } from '../../context/JournalContext';
import { JournalEntryCard } from '../../components/journal/JournalEntryCard';
import { FAB } from '../../components/common/FAB';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const { entries, isLoading, refreshEntries } = useJournal();
  const navigation = useNavigation();

  useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);

  const handleEditEntry = (entry) => {
    navigation.navigate('EditEntry', { entry });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <JournalEntryCard 
            entry={item}
            onPress={() => handleEditEntry(item)}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshEntries} />
        }
      />
      <FAB
        icon="plus"
        onPress={() => navigation.navigate('NewEntry')}
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

export default HomeScreen;