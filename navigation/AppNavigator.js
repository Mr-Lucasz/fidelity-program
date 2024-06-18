// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterVisitScreen from '../screens/RegisterVisitScreen';
import RegisterScreen from '../screens/RegisterScreen';  // Adiciona a importação da tela de registro

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RegisterVisit" component={RegisterVisitScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />  {/* Adiciona a nova tela ao navegador */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;