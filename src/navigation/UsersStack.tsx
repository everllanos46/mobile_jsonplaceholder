
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersListScreen from '../screens/Users/UsersListScreen';
import UserDetailScreen from '../screens/Users/UserDetailScreen';
import PostDetailScreen from '../screens/Posts/PostDetailScreen';
import { UsersStackParamList } from './types';

const Stack = createNativeStackNavigator<UsersStackParamList>();

export default function UsersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UsersList"
        component={UsersListScreen}
        
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
