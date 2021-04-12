import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, View, Text } from 'native-base';

export default function Start({ navigation }) {
  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 40 }}>Start Page 입니다</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push('SignIn');
          }}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push('SignUp');
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push('Main');
          }}
        >
          <Text>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push('CreateArticle');
          }}
        >
          <Text>CreateArticle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push('ReadArticle');
          }}
        >
          <Text>ReadArticle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push('UpdateArticle');
          }}
        >
          <Text>UpdateArticle</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    justifyContent: 'center',
  },
  content: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'skyblue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
