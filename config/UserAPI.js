import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://13.125.8.25';

// 완료
export async function getHello() {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/api/hello',
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
      url: host + '/api/user/signup',
      data: {
        username: id,
        password: password,
        name: name,
        stack: stack,
      },
    });

    console.log(response.data);

    Alert.alert('회원가입 성공!');
    navigation.push('SignIn');
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function login(navigation, id, password) {
  try {
    console.log('로그인 시도');
    const response = await axios({
      method: 'post',
      url: host + '/login',
      data: {
        username: id,
        password: password,
      },
    });

    const token = response.headers.authorization;
    await AsyncStorage.setItem('session', token);

    Alert.alert('로그인 성공!');
    navigation.push('TabNavigator');
  } catch (err) {
    const error = err.response.data.message || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function logout(navigation) {
  try {
    await AsyncStorage.clear();

    Alert.alert('로그아웃!');
    navigation.push('SignIn');
  } catch (err) {
    const error = err.response.data.message || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function getUserInfo() {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'get',
      url: host + '/api/user/cur_user',
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.message || err.message;

    Alert.alert(error);
  }
}

export async function getCrewsByPage(pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/api/user/all',
      params: {
        page: pageNum,
      },
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.message || err.message;

    Alert.alert(error);
  }
}

export async function getCrewsByNameByPage(name, pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/api/user/search',
      params: {
        name: name,
        page: pageNum,
      },
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

export async function getCrewsByStackByPage(stack, pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/api/user',
      params: {
        stack: stack,
        page: pageNum,
      },
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.message || err.message;

    Alert.alert(error);
  }
}
