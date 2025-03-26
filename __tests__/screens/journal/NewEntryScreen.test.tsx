import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NewEntryScreen } from './NewEntryScreen';
import { JournalProvider } from '../../context/JournalContext';
import { AuthProvider } from '../../context/AuthContext';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe('NewEntryScreen', () => {
  it('creates a new entry', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <JournalProvider>
          <NewEntryScreen />
        </JournalProvider>
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter title'), 'Test Title');
    fireEvent.changeText(
      getByPlaceholderText('Write your thoughts...'),
      'Test Content'
    );

    fireEvent.press(getByText('Save Entry'));

    await waitFor(() => {
      // Add assertions for what should happen after entry is saved
    });
  });
});