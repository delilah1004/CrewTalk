import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Text, Form } from 'native-base';

import { SignInput } from '../../components/input';
import { SignButton } from '../../components/button';

export default function SignIn({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  //뒤로가기금지
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);

  const button = () => {
    if (id == '' || password == '') {
      return <SignButton title={'로그인'} empty={true} />;
    } else {
      return <SignButton title={'로그인'} empty={false} />;
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.title}>
            항해99 1기를 위한 소통공간 입니다.{'\n'}
            크루원들과 정보도 공유하고{'\n'}
            그간 느낀 점을 공유해보세요.
          </Text>
        </View>

        {/* 아이디/비밀번호 컨테이너 */}

        <Form
          style={{
            marginTop: 30,
            alignItems: 'center',
          }}
        >
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
        </Form>

        {/* 로그인버튼 */}
        {button()}

        {/* 회원가입텍스트 */}
        <View style={styles.regist}>
          <Text
            style={{
              fontSize: 15,
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              navigation.push('SignUp');
            }}
          >
            회원가입
          </Text>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    textAlign: 'center',
  },
  regist: {
    width: '80%',
    marginTop: 30,
    alignItems: 'flex-end',
  },
});
