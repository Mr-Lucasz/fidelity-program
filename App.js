import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import withDevTools from './withDevTools'; // Certifique-se de que o caminho está correto

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

App.displayName = 'App';

export default withDevTools(App);