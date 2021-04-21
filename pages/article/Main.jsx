import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  RefreshControl,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Container } from 'native-base';

import { FontAwesome } from '@expo/vector-icons';

import Loading from '../../pages/Loading';

import ArticleCard from '../../components/card/ArticleCard';

import { getArticleByPage } from '../../config/ArticleAPI';
import { getUserInfo } from '../../config/UserAPI';

const WindowWidth = Dimensions.get('window').width;
const ThumbSize = WindowWidth * 0.12;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Main({ navigation }) {
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [articles, setArticles] = useState([]);

  const [userId, setUserId] = useState('');
  const [pageNum, setPageNum] = useState(1);

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
    const result = await getArticleByPage(pageNum);
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
      <FlatList
        data={articles}
        initialNumToRender={5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            // 글 쓰기
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
          );
        }}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          let nextArticles = await getArticleByPage(pageNum + 1);
          setPageNum(pageNum + 1);
          if (nextArticles.length != 0) {
            let allArticles = [...articles, ...nextArticles];
            await setArticles(allArticles);
          }
        }}
        renderItem={(article, i) => {
          return (
            // 글 목록
            <ArticleCard
              navigation={navigation}
              article={article.item}
              loc={'main'}
              userId={userId}
              key={i}
            />
          );
        }}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
      />
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
