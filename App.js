import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';

export function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

App.displayName = 'App';