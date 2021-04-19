import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';

import { SignIn, SignUp, Setting } from '../pages/user';
import {
  Main,
  ReadArticle,
  CreateArticle,
  SearchArticle,
  UpdateArticle,
} from '../pages/article';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="TabNavigator" component={TabNavigator} />

      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="ReadArticle" component={ReadArticle} />
      <Stack.Screen name="CreateArticle" component={CreateArticle} />
      <Stack.Screen name="SearchArticle" component={SearchArticle} />
      <Stack.Screen name="UpdateArticle" component={UpdateArticle} />

      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
