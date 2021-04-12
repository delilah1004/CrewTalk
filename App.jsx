import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";

import * as Font from "expo-font";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);

  const [ready, setReady] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      loadFont();
    });
    setReady(true);
  }, []);

  const loadFont = async () => {
    await Font.loadAsync({
      // 본문 Font
      KoPub_light: require("./assets/fonts/KoPubWorld-Dotum-Light.ttf"),
      KoPub_medium: require("./assets/fonts/KoPubWorld-Dotum-Medium.ttf"),
      KoPub_bold: require("./assets/fonts/KoPubWorld-Dotum-Bold.ttf"),
      // 제목 및 굵은 글씨 Font
      Malgun_sl: require("./assets/fonts/MALGUNSL.ttf"),
      Malgun: require("./assets/fonts/MALGUN.ttf"),
      Malgun_bold: require("./assets/fonts/MALGUNBD.ttf"),
      // 숫자 관련 Font
      Spoqa_thin: require("./assets/fonts/SpoqaHanSansNeo-Thin.ttf"),
      Spoqa_light: require("./assets/fonts/SpoqaHanSansNeo-Light.ttf"),
      Spoqa_medium: require("./assets/fonts/SpoqaHanSansNeo-Medium.ttf"),
      Spoqa_regular: require("./assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
      Spoqa_bold: require("./assets/fonts/SpoqaHanSansNeo-Bold.ttf"),
    });
  };

  return ready ? (
    <NavigationContainer>
      <StatusBar backgroundColor="#777" style="light" />
      <StackNavigator />
    </NavigationContainer>
  ) : (
    <Loading />
  );
}
