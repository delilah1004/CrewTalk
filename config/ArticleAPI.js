import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://13.125.8.25/api';

// 완료
export async function createPost(navigation, content, url) {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'post',
      url: host + '/post',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        content: content,
        url: url,
      },
    });

    if (response.data.success) {
      await Alert.alert('업로드 완료!');
      navigation.goBack();
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

    // console.log(response.data);
    return response.data;
  } catch (err) {
    const error = err.response.data.error || err.message;

    Alert.alert(error);
  }
}
