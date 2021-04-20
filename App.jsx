import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigations/StackNavigator';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#777" style="light" />
      <StackNavigator />
    </NavigationContainer>
  );
}
