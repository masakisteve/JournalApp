import { JournalEntry, Category } from '../types/journal.types';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

// Calculate entry frequency by day
export const calculateEntryFrequency = (entries: JournalEntry[]) => {
  const frequencyMap = entries.reduce((acc, entry) => {
    const date = format(parseISO(entry.createdAt), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return frequencyMap;
};

// Calculate category distribution
export const calculateCategoryDistribution = (
  entries: JournalEntry[],
  categories: Category[]
) => {
  const distribution = categories.map(category => {
    const count = entries.filter(entry => 
      entry.categoryIds.includes(category.id)
    ).length;

    return {
      name: category.name,
      count,
      color: category.color,
    };
  });

  return distribution;
};

// Calculate word count trends
export const calculateWordCountTrend = (entries: JournalEntry[]) => {
  const sortedEntries = [...entries].sort((a, b) => 
    parseISO(a.createdAt).getTime() - parseISO(b.createdAt).getTime()
  );

  return sortedEntries.map(entry => ({
    date: format(parseISO(entry.createdAt), 'MMM d'),
    wordCount: entry.content.split(/\s+/).length,
  }));
};

// Calculate average entry length by category
export const calculateAverageLengthByCategory = (
  entries: JournalEntry[],
  categories: Category[]
) => {
  const categoryStats = categories.map(category => {
    const categoryEntries = entries.filter(entry =>
      entry.categoryIds.includes(category.id)
    );

    const totalWords = categoryEntries.reduce(
      (sum, entry) => sum + entry.content.split(/\s+/).length,
      0
    );

    return {
      name: category.name,
      average: categoryEntries.length ? totalWords / categoryEntries.length : 0,
      color: category.color,
    };
  });

  return categoryStats;
};