import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text } from 'react-native';
import { Container, View } from 'native-base';

export default function SearchMember({ navigation }) {
  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <Text>크루원 검색 Page 입니다.</Text>
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
