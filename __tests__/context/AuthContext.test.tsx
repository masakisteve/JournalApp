import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides authentication state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
  });

  it('handles login', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    const testUser = { id: '1', email: 'test@test.com', name: 'Test User' };
    const testToken = 'test-token';

    await act(async () => {
      await result.current.login(testToken, testUser);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe(testToken);
    expect(result.current.user).toEqual(testUser);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', testToken);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(testUser));
  });
});