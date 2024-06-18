import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebase';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterVisitScreen from '../screens/RegisterVisitScreen';
import RewardsScreen from '../screens/RewardsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import RegisterScreen from '../screens/RegisterScreen'; // Ensure this import

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Profile':
              iconName = focused ? 'ios-person' : 'ios-person-outline';
              break;
            case 'RegisterVisit':
              iconName = focused ? 'ios-qr-code' : 'ios-qr-code-outline';
              break;
            case 'Rewards':
              iconName = focused ? 'ios-gift' : 'ios-gift-outline';
              break;
            case 'Transactions':
              iconName = focused ? 'ios-list' : 'ios-list-outline';
              break;
            default:
              iconName = 'ios-alert';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Tab.Screen name="RegisterVisit" component={RegisterVisitScreen} options={{ title: 'Scanner QR' }} />
      <Tab.Screen name="Rewards" component={RewardsScreen} options={{ title: 'Recompensas' }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Histórico' }} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}