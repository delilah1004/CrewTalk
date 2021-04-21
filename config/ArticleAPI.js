import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://13.125.8.25/api';

// 완료
export async function createArticle(navigation, title, contents) {
  try {
    const token = await AsyncStorage.getItem('session');
    await axios({
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

    await Alert.alert('업로드 완료!');
    await navigation.goBack();
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

export async function getArticleByPage(pageNum) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/article',
      params: {
        page: pageNum,
      },
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.err || err.message;

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
      await navigation.goback();
    } else {
      Alert.alert('업로드 실패');
    }
  } catch (err) {
    const error = err.response.data.error || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function updateArticle(navigation, title, contents, articleId) {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'put',
      url: host + '/article/' + articleId,
      headers: {
        Authorization: token,
      },
      data: {
        title: title,
        contents: contents,
      },
    });

    await Alert.alert(response.data.Success);
    await navigation.navigate('TabNavigator');
  } catch (err) {
    const error = err.response.data.err || err.message;

    await Alert.alert(error);
  }
}

// 완료
export async function deleteArticle(navigation, articleId) {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'delete',
      url: host + '/article/' + articleId,
      headers: {
        Authorization: token,
      },
    });

    await Alert.alert(response.data.Success);
    await navigation.goBack();
  } catch (err) {
    const error = err.response.data.err || err.message;

    await Alert.alert(error);
  }
}
