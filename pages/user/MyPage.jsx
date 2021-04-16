import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text } from 'react-native';
import { Container, View } from 'native-base';

import { logout } from '../../config/UserAPI';

export default function Mypage({ navigation }) {
  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 20 }}>MyPage 입니다.</Text>

        {/* 로그아웃 */}
        <Text
          style={{
            fontSize: 15,
            textDecorationLine: 'underline',
          }}
          onPress={() => {
            logout(navigation);
          }}
        >
          로그아웃
        </Text>
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
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
