import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { Container, View, Header, Button } from 'native-base';

import { SignInput } from '../../components/input';
import { SignButton, StackButton } from '../../components/button';

import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { register } from '../../config/UserAPI';

const windowHeight = Dimensions.get('window').height;

export default function SignUp({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');

  const [scrollHeight, setScrollHeight] = useState(0);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setScrollHeight(windowHeight - height + getStatusBarHeight());
  };

  const button = () => {
    if (id == '' || password == '' || name == '' || stack == '') {
      return <SignButton title={'회원가입'} empty={true} />;
    } else {
      return (
        <SignButton title={'회원가입'} empty={false} doFunction={signUp} />
      );
    }
  };

  const signUp = () => {
    register(navigation, id, password, name, stack);
  };

  return (
    <Container style={styles.container}>
      {/* 헤더 */}
      <Header style={styles.header} onLayout={onLayout} transparent>
        <Button transparent onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Button>

        <Text>회원가입</Text>

        <Button transparent>
          <MaterialIcons name="arrow-back" size={24} color="transparent" />
        </Button>
      </Header>

      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scroll, { height: scrollHeight }]}
      >
        {/* Contents */}

        <View style={[styles.content]}>
          {/* 아이디 */}
          <SignInput
            label={'아이디'}
            value={id}
            type={'id'}
            hint={'아이디를 입력하세요'}
            setValue={setId}
            msg={
              '자리수: 4자리 이상\n허용 문자열: 영문 소문자, 숫자, 특수문자(._)'
            }
          />

          {/* 비밀번호 */}
          <SignInput
            label={'비밀번호'}
            value={password}
            type={'password'}
            hint={'비밀번호를 입력하세요'}
            setValue={setPassword}
            msg={
              '자리수: 4자리 이상\n허용 문자열: 영문 소문자, 숫자\n(각각 하나 이상 포함되어야 함)'
            }
          />

          {/* 이름 */}
          <SignInput
            label={'이름'}
            value={name}
            type={'name'}
            hint={'이름을 입력하세요'}
            setValue={setName}
          />

          {/* 스택 */}
          <View style={{ width: '80%' }}>
            <Text style={styles.label}>주특기</Text>
            <View style={styles.boxContainer}>
              {/* React Native */}
              <StackButton
                title={'React Native'}
                setStack={setStack}
                currentStack={stack}
              />

              {/* React */}
              <StackButton
                title={'React'}
                setStack={setStack}
                currentStack={stack}
              />
            </View>

            <View style={styles.boxContainer}>
              {/* Node.js */}
              <StackButton
                title={'Node.js'}
                setStack={setStack}
                currentStack={stack}
              />

              {/* Spring */}
              <StackButton
                title={'Spring'}
                setStack={setStack}
                currentStack={stack}
              />
            </View>
          </View>

          {/* 회원가입 버튼 */}
          {button()}
        </View>
      </KeyboardAwareScrollView>
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
  scroll: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#263238',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
