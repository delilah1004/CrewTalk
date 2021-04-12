import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";

export default function CreateArticle() {
  return <Container style={styles.container}></Container>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
