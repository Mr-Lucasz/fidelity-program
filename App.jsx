import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import withDevTools from './withDevTools.js';
import { registerRootComponent } from 'expo';

export function App() {
  console.log('App component is rendered');
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

App.displayName = 'App';

registerRootComponent(App);
export default withDevTools(App);

console.log('Registering the App component');                   

