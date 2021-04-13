import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, View, Text, Header, Button } from 'native-base';

import { SignInput } from '../../components/input';

import { MaterialIcons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export default function SignUp({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <Container style={styles.container}>
      {/* 헤더 */}
      <Header style={styles.header} transparent>
        <Button transparent onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Button>

        <Text>회원가입</Text>

        <Button transparent>
          <MaterialIcons name="arrow-back" size={24} color="transparent" />
        </Button>
      </Header>

      {/* Contents */}
      <View style={styles.content}>
        {/* 아이디 */}
        <SignInput
          label={'아이디'}
          value={id}
          type={'id'}
          hint={'아이디를 입력하세요'}
          setValue={setId}
        />

        {/* 비밀번호 */}
        <SignInput
          label={'비밀번호'}
          value={password}
          type={'password'}
          hint={'비밀번호를 입력하세요'}
          setValue={setPassword}
        />

        {/* 이름 */}
        <SignInput
          label={'이름'}
          value={name}
          type={'name'}
          hint={'이름을 입력하세요'}
          setValue={setName}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    borderBottomWidth: 1.8,
    borderBottomColor: '#D8D8D8',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    height: windowHeight - getStatusBarHeight(),
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
