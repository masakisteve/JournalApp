import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { NewEntryScreen } from '../screens/journal/NewEntryScreen';
import { EditEntryScreen } from '../screens/journal/EditEntryScreen';

const Stack = createNativeStackNavigator();

export const JournalStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'My Journal'
        }}
      />
      <Stack.Screen
        name="NewEntry"
        component={NewEntryScreen}
        options={{
          title: 'New Entry'
        }}
      />
      <Stack.Screen
        name="EditEntry"
        component={EditEntryScreen}
        options={{
          title: 'Edit Entry'
        }}
      />
    </Stack.Navigator>
  );
};