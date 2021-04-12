import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Platform from "react-native";
import { Foundation, Ionicons, FontAwesome } from "@expo/vector-icons";

import 파일명 from "파일경로";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          let iconKind = "";

          if (route.name === "Main") {
            iconKind = "Foundation";
            iconName = "home";
          } else if (route.name === "SearchMember") {
            iconKind = "Ionicons";
            iconName += "search-sharp";
          } else if (route.name === "MyPage") {
            iconKind = "FontAwesome";
            iconName = "user-circle-o";
          }

          if (iconKind === "Foundation") {
            return (
              <Foundation
                name={iconName}
                color={focused ? "#ED6653" : "#777"}
                size={24}
              />
            );
          } else if (iconKind === "Ionicons") {
            return (
              <Ionicons
                name={iconName}
                color={focused ? "#ED6653" : "#777"}
                size={24}
              />
            );
          } else if (iconKind === "FontAwesome") {
            return (
              <FontAwesome
                name={iconName}
                color={focused ? "#ED6653" : "#777"}
                size={24}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#FFF",
          borderTopColor: "#EEE",
          height: "8%",
        },
      }}>
      <Tabs.Screen name="파일명" component={파일명} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
