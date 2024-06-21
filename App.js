import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}