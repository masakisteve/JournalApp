import React from 'react';
import { View, Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { calculateEntryFrequency } from '../../utils/analyticsUtils';
import { JournalEntry } from '../../types/journal.types';

type Props = {
  entries: JournalEntry[];
};

export const EntryFrequencyChart = ({ entries }: Props) => {
  const frequencyData = calculateEntryFrequency(entries);
  const commitsData = Object.entries(frequencyData).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <View>
      <ContributionGraph
        values={commitsData}
        endDate={new Date()}
        numDays={105}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        }}
        tooltipDataAttrs={() => ({})}
        onDayPress={(value) => {
          // Handle day press here if needed
          console.log(`${value.date}: ${value.count} entries`);
        }}
      />
    </View>
  );
};