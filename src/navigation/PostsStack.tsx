import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsListScreen from '../screens/Posts/PostsListScreen';
import PostDetailScreen from '../screens/Posts/PostDetailScreen';
import { PostsStackParamList } from './types';

const Stack = createNativeStackNavigator<PostsStackParamList>(); 

export default function PostsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsList"
        component={PostsListScreen}
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
