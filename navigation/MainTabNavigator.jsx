import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterVisitScreen } from '../screens/RegisterVisitScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { TransactionsScreen } from '../screens/TransactionsScreen';

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'RegisterVisit':
              iconName = focused ? 'qr-code' : 'qr-code-outline';
              break;
            case 'Rewards':
              iconName = focused ? 'gift' : 'gift-outline';
              break;
            case 'Transactions':
              iconName = focused ? 'list' : 'list-outline';
              break;
            default:
              iconName = 'alert';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Tab.Screen name="RegisterVisit" component={RegisterVisitScreen} options={{ title: 'Scanner QR' }} />
      <Tab.Screen name="Rewards" component={RewardsScreen} options={{ title: 'Recompensas' }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Histórico' }} />
    </Tab.Navigator>
  );
}