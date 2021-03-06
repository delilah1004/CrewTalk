import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Platform from 'react-native';
import {
  AntDesign,
  Foundation,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';

import { Main, SearchArticle } from '../pages/article';
import { SearchCrew, MyPage } from '../pages/user';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          let iconKind = '';

          if (route.name === 'Main') {
            iconKind = 'Foundation';
            iconName = 'home';
          } else if (route.name === 'SearchArticle') {
            iconKind = 'AntDesign';
            iconName = 'profile';
          } else if (route.name === 'SearchCrew') {
            iconKind = 'Ionicons';
            iconName += 'people-outline';
          } else if (route.name === 'MyPage') {
            iconKind = 'FontAwesome';
            iconName = 'user-circle-o';
          }

          if (iconKind === 'Foundation') {
            return (
              <Foundation
                name={iconName}
                color={focused ? '#ED6653' : '#777'}
                size={24}
              />
            );
          } else if (iconKind === 'Ionicons') {
            return (
              <Ionicons
                name={iconName}
                color={focused ? '#ED6653' : '#777'}
                size={24}
              />
            );
          } else if (iconKind === 'AntDesign') {
            return (
              <AntDesign
                name={iconName}
                color={focused ? '#ED6653' : '#777'}
                size={24}
              />
            );
          } else if (iconKind === 'FontAwesome') {
            return (
              <FontAwesome
                name={iconName}
                color={focused ? '#ED6653' : '#777'}
                size={24}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#FFF',
          borderTopColor: '#EEE',
          height: '7%',
        },
      }}
    >
      <Tabs.Screen name="Main" component={Main} />
      <Tabs.Screen name="SearchArticle" component={SearchArticle} />
      <Tabs.Screen name="SearchCrew" component={SearchCrew} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
