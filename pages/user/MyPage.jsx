import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { View, Header, Button, Text, Thumbnail } from 'native-base';

import { AntDesign } from '@expo/vector-icons';

import Loading from '../Loading';

import ArticleCard from '../../components/card/ArticleCard';

import { getUserInfo } from '../../config/UserAPI';
import { getMyArticlesByPage } from '../../config/ArticleAPI';

const none = require('../../assets/none.png');
const img = require('../../assets/mask_lion.jpg');

export default function Mypage({ navigation }) {
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [user, setUser] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        download();
      });
    });
    setReady(true);
  }, []);

  const download = async () => {
    const result = await getUserInfo();
    setUser(result);
    const results = await getMyArticlesByPage(pageNum);
    setArticles(results);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return ready ? (
    <View style={styles.container}>
      {/* 헤더 */}
      <Header style={styles.header} transparent>
        <View>
          <Button disabled transparent>
            <AntDesign name="setting" size={24} color="transparent" />
          </Button>
        </View>

        <View>
          <Text style={styles.headerTitle}>마이페이지</Text>
        </View>

        <View>
          <Button transparent onPress={() => navigation.push('Setting')}>
            <AntDesign name="setting" size={24} color="black" />
          </Button>
        </View>
      </Header>

      {/* 프로필 */}
      <View style={styles.profileBox}>
        {/* 사용자 사진 */}
        <TouchableOpacity>
          <Thumbnail style={styles.thumbnail} source={img} />
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          {/* 사용자 이름 */}
          <Text style={styles.userName}>
            {user.name} ({user.username})
          </Text>

          {/* 사용자 Stack */}
          <Text style={styles.userStack}>{user.stack}</Text>
        </View>
      </View>

      {/* 타이틀 */}
      <View
        style={{
          backgroundColor: '#FFF',
          width: '100%',
          paddingVertical: 15,
          borderTopColor: '#EEE',
          borderTopWidth: 1,
          borderBottomColor: '#CCC',
          borderBottomWidth: 2,
        }}
      >
        <Text style={styles.headerTitle}>내가 작성한 게시글</Text>
      </View>

      {articles.length == 0 ? (
        <View
          style={{
            backgroundColor: '#FFF',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* 게시글 아이콘 */}
          <Image source={none} resizeMode="cover" style={styles.postIcon} />
          {/* 게시글 없을 때 멘트 */}
          <Text style={{ textAlign: 'center' }}>
            아직 업로드한 게시글이 없습니다.
          </Text>
          {/* 게시글 작성하기 버튼 */}
          <TouchableOpacity
            style={styles.addFirstPostButton}
            onPress={() => {
              navigation.push('CreateArticle');
            }}
          >
            <Text style={styles.addFirstPostText}>첫 게시글 작성하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={articles}
          initialNumToRender={5}
          maxToRenderPerBatch={1}
          refreshing={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={async () => {
            let nextArticles = await getMyArticlesByPage(pageNum + 1);
            setPageNum(pageNum + 1);
            if (nextArticles.length != 0) {
              let allArticles = [...articles, ...nextArticles];
              setArticles(allArticles);
            }
          }}
          renderItem={(article, i) => {
            return (
              // 글 목록
              <View>
                <ArticleCard
                  navigation={navigation}
                  article={article.item}
                  loc={'main'}
                  userId={user.username}
                  key={i}
                />
              </View>
            );
          }}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // 프로필 영역
  profileBox: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  // 프로필 정보 영역
  profileInfo: {
    paddingStart: 20,
    justifyContent: 'center',
  },
  // 사용자 이름
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  // 사용자 Stack
  userStack: {
    color: '#999',
    fontSize: 14,
    marginVertical: 5,
  },

  // 게시글 아이콘
  postIcon: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // 게시글 작성하기 버튼
  addFirstPostButton: {
    backgroundColor: '#ed6653',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 게시글 작성하기 Text
  addFirstPostText: {
    fontSize: 14,
    color: 'white',
  },
});
