import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import UsersStack from './UsersStack';
import PostsStack from './PostsStack';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'alert-circle-outline';

            if (route.name === 'Usuarios') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Posts') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Usuarios" component={UsersStack} />
        <Tab.Screen name="Posts" component={PostsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
