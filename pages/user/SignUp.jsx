import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { Container, View, Header, Button } from 'native-base';

import { SignInput } from '../../components/input';
import { SignButton } from '../../components/button';

import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const windowHeight = Dimensions.get('window').height;

export default function SignUp({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [scrollHeight, setScrollHeight] = useState(0);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setScrollHeight(windowHeight - height + getStatusBarHeight());
  };

  const button = () => {
    if (id == '' || password == '' || name == '') {
      return <SignButton title={'회원가입'} empty={true} />;
    } else {
      return <SignButton title={'회원가입'} empty={false} />;
    }
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
});
