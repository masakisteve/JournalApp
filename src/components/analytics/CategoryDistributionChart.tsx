import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { calculateCategoryDistribution } from '../../utils/analyticsUtils';
import { JournalEntry, Category } from '../../types/journal.types';

type Props = {
  entries: JournalEntry[];
  categories: Category[];
};

export const CategoryDistributionChart = ({ entries, categories }: Props) => {
  const distribution = calculateCategoryDistribution(entries, categories);
  const chartData = distribution.map(item => ({
    name: item.name,
    population: item.count,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <View>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};