import React, { createContext, useContext, useState, useCallback } from 'react';
import { JournalEntry, Category } from '../types/journal.types';
import { journalApi } from '../api/journalApi';

type JournalContextType = {
  entries: JournalEntry[];
  categories: Category[];
  isLoading: boolean;
  createEntry: (entry: Omit<JournalEntry, 'id'>) => Promise<void>;
  updateEntry: (id: string, entry: Partial<JournalEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  refreshEntries: () => Promise<void>;
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      const [newEntries, newCategories] = await Promise.all([
        journalApi.getEntries(),
        journalApi.getCategories(),
      ]);
      setEntries(newEntries);
      setCategories(newCategories);
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEntry = async (entry: Omit<JournalEntry, 'id'>) => {
    // Optimistic update
    const tempId = 'temp-' + Date.now();
    const tempEntry = { ...entry, id: tempId };
    setEntries(prev => [tempEntry, ...prev]);

    try {
      const created = await journalApi.createEntry(entry);
      setEntries(prev => 
        prev.map(e => e.id === tempId ? created : e)
      );
    } catch (error) {
      setEntries(prev => prev.filter(e => e.id !== tempId));
      throw error;
    }
  };

  // Similar optimistic updates for updateEntry and deleteEntry...

  return (
    <JournalContext.Provider 
      value={{ 
        entries, 
        categories, 
        isLoading, 
        createEntry, 
        updateEntry, 
        deleteEntry, 
        refreshEntries 
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};