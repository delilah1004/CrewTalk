import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://13.125.8.25/api';

// 완료
export async function createArticle(navigation, title, contents) {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'post',
      url: host + '/article',
      headers: {
        Authorization: token,
      },
      data: {
        title: title,
        contents: contents,
      },
    });

    if (response.data) {
      await Alert.alert('업로드 완료!');
      navigation.navigate('TabNavigator');
    } else {
      Alert.alert('업로드 실패');
    }
  } catch (err) {
    const error = err.response.data.error || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function getArticleAll() {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/article/all',
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.error || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function readArticle(navigation, title, contents) {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'post',
      url: host + '/article',
      headers: {
        Authorization: token,
      },
      data: {
        title: title,
        contents: contents,
      },
    });

    if (response.data) {
      await Alert.alert('업로드 완료!');
      navigation.navigate('TabNavigator');
    } else {
      Alert.alert('업로드 실패');
    }
  } catch (err) {
    const error = err.response.data.error || err.message;

    Alert.alert(error);
  }
}
