import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import withDevTools from './withDevTools.js';
import { registerRootComponent } from 'expo';
import Toast from 'react-native-toast-message';

export function App() {
  console.log('App component is rendered');
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
};

App.displayName = 'App';

registerRootComponent(App);
export default withDevTools(App);

console.log('Registering the App component');

