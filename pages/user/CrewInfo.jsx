import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Container, Text, View, Thumbnail, Button, Header } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import Loading from '../Loading';

import ArticleCard from '../../components/card/ArticleCard';

import { getCrewArticlesByPage } from '../../config/ArticleAPI';

const none = require('../../assets/none.png');
const img = require('../../assets/mask_lion.jpg');

export default function CrewInfo({ navigation, route }) {
  const crew = route.params;

  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
    const results = await getCrewArticlesByPage(crew.username, pageNum);
    setArticles(results);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return ready ? (
    <Container style={styles.container}>
      {/* 헤더 */}
      <Header style={styles.header} transparent>
        <View>
          <Button transparent onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color="grey" size={26} />
          </Button>
        </View>

        <View>
          <Text style={styles.headerTitle}>{crew.name}님의 Profile</Text>
        </View>

        <View>
          <Button transparent>
            <Ionicons name="chevron-back" color="transparent" size={26} />
          </Button>
        </View>
      </Header>

      {/* 프로필 */}
      <View style={styles.profileBox}>
        {/* 사용자 사진 */}
        <TouchableOpacity>
          <Thumbnail source={img} />
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          {/* 크루원 이름 */}
          <Text style={styles.crewName}>
            {crew.name} ({crew.username})
          </Text>

          {/* 크루원 Stack */}
          <Text style={styles.crewStack}>{crew.stack}</Text>
        </View>
      </View>

      {/* 크루원이 작성한 게시글 */}
      {/* 타이틀 */}
      <View
        style={{
          width: '100%',
          paddingVertical: 15,
          borderTopColor: '#EEE',
          borderTopWidth: 1,
          borderBottomColor: '#CCC',
          borderBottomWidth: 2,
        }}
      >
        <Text style={styles.headerTitle}>{crew.name}님이 작성한 게시글</Text>
      </View>
      {articles.length == 0 ? (
        <View style={styles.articleContainer}>
          {/* 게시글 아이콘 */}
          <Image source={none} resizeMode="cover" style={styles.articleIcon} />

          {/* 게시글 없을 때 멘트 */}
          <Text style={{ textAlign: 'center' }}>
            아직 업로드한 게시물이 없어요.
          </Text>

          {/* 게시글 작성하기 버튼 */}
          <TouchableOpacity
            style={styles.addFirstPostButton}
            onPress={() => {
              navigation.push('CreateArticle');
            }}
          >
            <Text style={styles.addFirstPostText}>첫게시물 작성하기</Text>
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
            let nextArticles = await getCrewArticlesByPage(
              crew.username,
              pageNum + 1
            );
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
                  userId={crew.username}
                  key={i}
                />
              </View>
            );
          }}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </Container>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  // 크루원 이름
  crewName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  // 크루원 Stack
  crewStack: {
    color: '#999',
    fontSize: 14,
    marginVertical: 5,
  },

  // 크루원 게시글 헤더
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

  articleContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
  },

  // 게시글 아이콘
  articleIcon: {
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
