import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import Loading from '../Loading';

import ArticleCard from '../../components/card/ArticleCard';

import { StackSearchButton } from '../../components/button';

import stackList from '../../config/mock/stackList.json';
import {
  getArticleByPage,
  getArticleByStackByPage,
} from '../../config/ArticleAPI';
import { getUserInfo } from '../../config/UserAPI';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SearchArticle({ navigation }) {
  const stacks = stackList.stack;
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [select, setSelect] = useState('전체');
  const [articles, setArticles] = useState([]);

  const [userId, setUserId] = useState('');
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getUserId();
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
        setSelect('전체');
        getArticles(select);
        setReady(true);
      });
    });
  }, []);

  const getArticles = useCallback(async (title) => {
    setSelect(title);
    setPageNum(1);
    let result = [];
    if (title == '전체') {
      result = await getArticleByPage(1);
    } else {
      result = await getArticleByStackByPage(title, 1);
    }
    setArticles(result);
  });

  const getUserId = async () => {
    const user = await getUserInfo();
    setUserId(user.username);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return ready ? (
    <View style={styles.container}>
      <FlatList
        data={articles}
        initialNumToRender={5}
        refreshing={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            // Stack 분류
            <ScrollView
              contentContainerStyle={styles.stackSearch}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                {stacks.map((title, i) => {
                  return (
                    <StackSearchButton
                      title={title}
                      select={select}
                      doFunction={getArticles}
                      key={i}
                    />
                  );
                })}
              </View>
            </ScrollView>
          );
        }}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          let nextArticles = [];
          if (select == '전체') {
            nextArticles = await getArticleByPage(pageNum + 1);
            setPageNum(pageNum + 1);
          } else {
            nextArticles = await getArticleByStackByPage(select, pageNum + 1);
            setPageNum(pageNum + 1);
          }
          if (nextArticles.length != 0) {
            let allArticles = [...articles, ...nextArticles];
            setArticles(allArticles);
          }
        }}
        renderItem={(article, i) => {
          return (
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
    </View>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    flex: 1,
    marginTop: getStatusBarHeight(),
    alignItems: 'center',
  },

  stackSearch: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});
