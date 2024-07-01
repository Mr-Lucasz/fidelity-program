// App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import withDevTools from './withDevTools'; // Ensure this path is correct
import { registerRootComponent } from 'expo';

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

App.displayName = 'App';

export default withDevTools(App);

// Register the main component
registerRootComponent(App);