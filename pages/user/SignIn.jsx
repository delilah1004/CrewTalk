import React, { useState, useEffect } from 'react';
import {
  Container,
  Content,
  Text,
  Form,
} from 'native-base';
import { SignInput } from '../../components/input/';
import { SignButton } from '../../components/button/';

export default function SignIn({ navigation }) {
  const goSignUp = () => {
    navigation.navigate('SignUp');
  };
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setidError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //뒤로가기금지
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);

  const goSignIn = () => {
    //로그인 버튼 오류검수
    //관리 상태 값을 확인
    console.log(id);
    console.log(password);
    if (id == '') {
      setidError('이메일을 입력해주세요');
    } else {
      setidError('');
    }

    const goSignUp = () => {
      navigation.navigate('SignUp');
    };

    if (password == '') {
      setPasswordError('비밀번호를 입력해주세요');
    } else {
      setPasswordError('');
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }} >

        <Text style={{
          marginTop: -130,
          height: 190,
          width: '80%',
          fontSize: 20,
          fontWeight: '700',
          lineHeight: 30,
          color: 'black',
          textAlign: 'center',
          alignItems: 'center',
          // borderStyle: 'solid',
          // borderWidth: 1
        }}>
          항해99 1기를 위한 소통공간 입니다.{"\n"}
          크루원들과 정보도 공유하고{"\n"}  
          그간 느낀 점을 공유해보세요.
          </Text>

        {/* 아이디비밀번호컨테이너 */}
        <Form style={{
          //  borderStyle: 'solid',
          //  borderWidth: 1,
          alignItems: 'center',
          boder: 1,
          marginTop: 30,
        }}>

          {/* 아이디 */}
          <SignInput
            label={'아이디'}
            value={id}
            type={'id'}
            hint={'아이디를 입력하세요'}
            setValue={setId}
            error={idError}
          />

          {/* 비밀번호 */}
          <SignInput
            label={'비밀번호'}
            value={password}
            type={'password'}
            hint={'비밀번호를 입력하세요'}
            setValue={setPassword}
            error={passwordError}
          />
        </Form>

        {/* 로그인버튼 */}
        <SignButton
          title={'로그인'}
          onPress={goSignIn} />

        {/* 회원가입텍스트 */}
        <Text style={{
          marginLeft: 240,
          fontSize: 15,
          marginTop: 35,
          textDecorationLine: "underline"
        }} onPress={goSignUp}>회원가입</Text>

      </Content>
    </Container >
  );
}
