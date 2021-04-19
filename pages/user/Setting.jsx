import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Container, Text, Header, Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { logout } from '../../config/UserAPI';

export default function Setting({ navigation }) {
  const signOut = async () => {
    await logout(navigation);
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header style={styles.header} transparent>
        <View>
          <Button
            style={styles.back}
            transparent
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" color="grey" size={26} />
          </Button>
        </View>

        <View>
          <Text style={{ textAlign: 'center' }}>Setting</Text>
        </View>

        <View>
          <Button disabled transparent>
            <Ionicons name="chevron-back" color="transparent" size={26} />
          </Button>
        </View>
      </Header>

      {/* 바디 */}
      <View style={styles.container}>
        <Text style={styles.title}>알림 설정</Text>
        <TouchableHighlight underlayColor="#EEE">
          <Text style={styles.listItem}>푸시 알림 설정</Text>
        </TouchableHighlight>

        <Text style={styles.title}>사용자 설정</Text>
        <TouchableHighlight onPress={signOut} underlayColor="#EEE">
          <Text style={styles.listItem}>로그아웃</Text>
        </TouchableHighlight>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    paddingTop: 10,
    alignSelf: 'center',
  },
  title: {
    padding: 10,
  },
  listItem: {
    padding: 20,
    fontSize: 18,
  },
});
