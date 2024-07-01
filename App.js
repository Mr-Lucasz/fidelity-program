// App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import { registerRootComponent } from 'expo';

console.log('App component is being loaded');
const App = () => {
  console.log('App component is rendered');
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};


App.displayName = 'App';
console.log('Registering the App component');

export default App;

// Register the main component
registerRootComponent(App);