import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Start from '../pages/Start';

import TabNavigator from './TabNavigator';

import { SignIn, SignUp } from '../pages/user';
import {
  Main,
  ReadArticle,
  CreateArticle,
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
      <Stack.Screen name="Start" component={Start} />

      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="TabNavigator" component={TabNavigator} />

      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="ReadArticle" component={ReadArticle} />
      <Stack.Screen name="CreateArticle" component={CreateArticle} />
      <Stack.Screen name="UpdateArticle" component={UpdateArticle} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
