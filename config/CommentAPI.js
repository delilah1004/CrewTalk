import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = 'http://13.125.8.25/api/comment';

//
export async function createComment(articleId, comment) {
  try {
    const token = await AsyncStorage.getItem('session');
    await axios({
      method: 'post',
      url: host + '/' + articleId,
      headers: {
        Authorization: token,
      },
      data: {
        comments: comment,
      },
    });

    Alert.alert('댓글 작성 완료!');
    return true;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

//
export async function getComments(articleId) {
  try {
    const response = await axios({
      method: 'get',
      url: host + '/',
      params: {
        articleId: articleId,
      },
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.err || err.message;

    Alert.alert(error);
  }
}

// 완료
export async function updateComment(commentId, comment) {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'put',
      url: host + '/' + commentId,
      headers: {
        Authorization: token,
      },
      data: {
        comments: comment,
      },
    });

    return response.data;
  } catch (err) {
    const error = err.response.data.err || err.message;

    await Alert.alert(error);
  }
}

// 완료
export async function deleteComment(commentId) {
  try {
    const token = await AsyncStorage.getItem('session');
    const response = await axios({
      method: 'delete',
      url: host + '/' + commentId,
      headers: {
        Authorization: token,
      },
    });

    await Alert.alert(response.data.Success);
  } catch (err) {
    const error = err.response.data.err || err.message;

    await Alert.alert(error);
  }
}
