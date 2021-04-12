import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet } from 'react-native';
import { Container, View, Text } from 'native-base';

export default function CreateArticle() {
  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <Text>게시글 작성 Page 입니다</Text>
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
    alignItems: 'center',
  },
});
