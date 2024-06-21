import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import withDevTools from 'path-to-withDevTools'; // Substitua pelo caminho correto

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

App.displayName = 'App';

export default withDevTools(App);