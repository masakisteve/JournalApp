import axios from 'axios';
import { JournalEntry, Category } from '../types/journal.types';

const API_URL = 'YOUR_API_URL';

export const journalApi = {
  // Entries
  async getEntries(): Promise<JournalEntry[]> {
    const response = await axios.get(`${API_URL}/entries`);
    return response.data;
  },

  async createEntry(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    const response = await axios.post(`${API_URL}/entries`, entry);
    return response.data;
  },

  async updateEntry(id: string, entry: Partial<JournalEntry>): Promise<JournalEntry> {
    const response = await axios.patch(`${API_URL}/entries/${id}`, entry);
    return response.data;
  },

  async deleteEntry(id: string): Promise<void> {
    await axios.delete(`${API_URL}/entries/${id}`);
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  },
};