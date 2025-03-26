import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { JournalProvider } from './src/context/JournalContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { AppNavigator } from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { useTheme } from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();

function AppContent(): React.JSX.Element {
  const { isAuthenticated } = useAuth();
  const { isDarkMode, theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            // Auth screens
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
              }}
            />
          ) : (
            // Main app screens
            <Stack.Screen 
              name="Main" 
              component={AppNavigator}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <JournalProvider>
            <AppContent />
          </JournalProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;