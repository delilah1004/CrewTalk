import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://13.125.8.25/api';

// 완료
export async function getHello() {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/hello',
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function register(navigation, id, password, name, stack) {
  try {
    const response = await axios({
      method: 'post',
      url: host + '/signup',
      data: {
        id: id,
        password: password,
        name: name,
        stack: stack,
      },
    });

    if (response.data.success) {
      Alert.alert('회원가입 성공!');
      navigation.push('SignIn');
    } else {
      Alert.alert('회원가입 실패');
    }
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function signIn(navigation, id, password) {
  try {
    const response = await axios({
      method: 'post',
      url: host + '/signin',
      data: {
        id: id,
        password: password,
      },
    });

    const token = response.data.result.user.token;
    await AsyncStorage.setItem('session', token);

    Alert.alert('로그인 성공!');
    navigation.push('Main');
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}
