import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container, View, Header, Button, Thumbnail } from 'native-base';

import { AntDesign } from '@expo/vector-icons';

import { getUserInfo } from '../../config/UserAPI';

const img = require('../../assets/mask_lion.jpg');

export default function Mypage({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    download();
  }, []);

  const download = async () => {
    const result = await getUserInfo();
    setUser(result);
  };

  return (
    <Container style={styles.container}>
      {/* 헤더 */}
      <Header style={styles.header} transparent>
        <View>
          <Button disabled transparent>
            <AntDesign name="setting" size={24} color="transparent" />
          </Button>
        </View>

        <View>
          <Text style={styles.headerTitle}>마이페이지</Text>
        </View>

        <View>
          <Button transparent onPress={() => navigation.push('Setting')}>
            <AntDesign name="setting" size={24} color="black" />
          </Button>
        </View>
      </Header>

      {/* 바디 */}
      <ScrollView>
        {/* 프로필 */}
        <View style={styles.profileBox}>
          {/* 사용자 사진 */}
          <TouchableOpacity>
            <Thumbnail style={styles.thumbnail} source={img} />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            {/* 사용자 이름 */}
            <Text style={styles.userName}>
              {user.name} ({user.username})
            </Text>

            {/* 사용자 Stack */}
            <Text style={styles.userStack}>{user.stack}</Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // 프로필 영역
  profileBox: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  // 프로필 정보 영역
  profileInfo: {
    paddingStart: 20,
    justifyContent: 'center',
  },
  // 사용자 이름
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  // 사용자 Stack
  userStack: {
    color: '#999',
    fontSize: 14,
    marginVertical: 5,
  },

  // flexDirection -> row
  flexRow: {
    flexDirection: 'row',
  },
  followBox: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
  },
});
