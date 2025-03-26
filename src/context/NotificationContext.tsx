import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NotificationContextType = {
  isNotificationsEnabled: boolean;
  toggleNotifications: () => void;
  reminderTime: string;
  setReminderTime: (time: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('20:00');

  useEffect(() => {
    loadNotificationPreferences();
  }, []);

  const loadNotificationPreferences = async () => {
    try {
      const [enabledValue, timeValue] = await Promise.all([
        AsyncStorage.getItem('notificationsEnabled'),
        AsyncStorage.getItem('reminderTime'),
      ]);

      if (enabledValue !== null) {
        setIsNotificationsEnabled(JSON.parse(enabledValue));
      }
      if (timeValue !== null) {
        setReminderTime(timeValue);
      }
    } catch (error) {
      console.error('Failed to load notification preferences:', error);
    }
  };

  const toggleNotifications = async () => {
    try {
      const newValue = !isNotificationsEnabled;
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newValue));
      setIsNotificationsEnabled(newValue);
    } catch (error) {
      console.error('Failed to save notification preference:', error);
    }
  };

  const updateReminderTime = async (time: string) => {
    try {
      await AsyncStorage.setItem('reminderTime', time);
      setReminderTime(time);
    } catch (error) {
      console.error('Failed to save reminder time:', error);
    }
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        isNotificationsEnabled, 
        toggleNotifications, 
        reminderTime, 
        setReminderTime: updateReminderTime 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};