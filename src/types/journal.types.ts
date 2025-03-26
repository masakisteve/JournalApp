export type Category = {
    id: string;
    name: string;
    color: string;
  };
  
  export type JournalEntry = {
    id: string;
    title: string;
    content: string;
    categoryIds: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
    userId: string;
  };
  
  export type UserProfile = {
    id: string;
    email: string;
    name: string;
    preferences: UserPreferences;
  };
  
  export type UserPreferences = {
    theme: 'light' | 'dark';
    defaultCategory: string;
    notificationsEnabled: boolean;
  };