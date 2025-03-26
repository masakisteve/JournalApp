import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useJournal } from '../../context/JournalContext';
import { EntryFrequencyChart } from '../../components/analytics/EntryFrequencyChart';
import { CategoryDistributionChart } from '../../components/analytics/CategoryDistributionChart';
import {
  calculateWordCountTrend,
  calculateAverageLengthByCategory,
} from '../../utils/analyticsUtils';

export const AnalyticsScreen = () => {
  const { entries, categories, isLoading } = useJournal();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const wordCountTrend = calculateWordCountTrend(entries);
  const categoryAverages = calculateAverageLengthByCategory(entries, categories);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Writing Consistency</Text>
        <EntryFrequencyChart entries={entries} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category Distribution</Text>
        <CategoryDistributionChart entries={entries} categories={categories} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statItem}>
            Total Entries: {entries.length}
          </Text>
          <Text style={styles.statItem}>
            Average Words per Entry:{' '}
            {Math.round(
              entries.reduce(
                (sum, entry) => sum + entry.content.split(/\s+/).length,
                0
              ) / entries.length
            )}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  statItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});