import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  RefreshControl,
  Dimensions,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Container } from 'native-base';

import { FontAwesome } from '@expo/vector-icons';

import Loading from '../../pages/Loading';
import ArticleCard from '../../components/card/ArticleCard';

import { getArticleAll } from '../../config/ArticleAPI';
import { getUserInfo } from '../../config/UserAPI';

const WindowWidth = Dimensions.get('window').width;
const ThumbSize = WindowWidth * 0.12;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Main({ navigation }) {
  const [ready, setReady] = useState(false);
  const [articles, setArticles] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [userId, setUserId] = useState('');

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        download();
      });
    });
    getUserId();
    setReady(true);
  }, [navigation]);

  const download = async () => {
    const result = await getArticleAll();
    setArticles(result);
  };

  const getUserId = async () => {
    const user = await getUserInfo();
    setUserId(user.username);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return ready ? (
    <Container style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* 글쓰기 */}
        <TouchableOpacity
          onPress={() => {
            navigation.push('CreateArticle');
          }}
        >
          <View style={styles.createBox}>
            <View style={{ width: '20%' }}>
              <FontAwesome
                style={{ alignSelf: 'center' }}
                name="user-circle-o"
                size={ThumbSize}
                color="#C7C7C7"
              />
            </View>
            <View style={{ width: '80%' }}>
              <Text style={styles.createText}>
                함께 나누고 싶은 생각이 있으신가요?
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 글목록 */}

        <View>
          {articles.map((article, i) => {
            return (
              <ArticleCard
                navigation={navigation}
                article={article}
                loc={'main'}
                key={i}
                userId={userId}
              />
            );
          })}
        </View>
      </ScrollView>
    </Container>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: getStatusBarHeight(),
  },
  createBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginVertical: 10,
    paddingVertical: 15,
    paddingLeft: 5,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    backgroundColor: '#F7F7F7',
    color: '#AAA',
    fontSize: 15,
    padding: 18,
    borderRadius: 5,
  },
});
