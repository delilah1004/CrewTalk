import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Text, View, Thumbnail, Button, Header } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

const none = require('../../assets/none.png');
const img = require('../../assets/mask_lion.jpg');

export default function CrewInfo({ navigation, route }) {
  const crew = route.params;

  return (
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
        {/* 크루원 프로필 사진 */}
        <Thumbnail large source={img} />

        {/* 크루원 이름 */}
        <Text style={styles.userName}>{crew.name}</Text>

        {/* 크루원 Stack */}
        <Text style={styles.userRole}>{crew.stack}</Text>

        {/* 자기소개 */}
        <Text style={{ fontSize: 14, marginBottom: 20 }}>자기소개입니다.</Text>
      </View>

      {/* 크루원이 작성한 게시글 */}
      <ScrollView>
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

        <View style={styles.postContainer}>
          {/* 게시글 아이콘 */}
          <Image source={none} resizeMode="cover" style={styles.postIcon} />

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
      </ScrollView>
    </Container>
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 사용자 이름
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  // 사용자 직함
  userRole: {
    color: '#999',
    fontSize: 14,
    marginVertical: 5,
  },
  // flexDirection -> row
  flexRow: {
    flexDirection: 'row',
  },
  followBox: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
  },
  // Follow Text
  followText: {
    fontSize: 15,
  },
  // Follow Number Text
  followNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // 팔로우 버튼
  button: {
    width: '90%',
    padding: 5,
    backgroundColor: '#FFEDEE',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#EB6552',
    fontSize: 14,
    padding: 3,
  },

  // Tab Bar
  tabBaractiveText: { color: 'black', fontWeight: '600' },
  tabBarText: { color: '#DBDBDB' },
  tabBarBackground: { backgroundColor: '#FFF' },

  // post 영역
  postContainer: {
    flex: 1,
    // height: WindowHeight,
    padding: 20,
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
