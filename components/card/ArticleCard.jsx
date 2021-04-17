import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import ArticleCardHeader from './ArticleCardHeader';

import { deleteArticle } from '../../config/ArticleAPI';

export default function ArticleCard({ navigation, article, loc }) {
  const remove = () => {
    deleteArticle(navigation, article.id);
  };

  const showCommentButton = () => {
    if (loc == 'main') {
      return (
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => {
            navigation.push('ReadArticle', article);
          }}
        >
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={20}
            color="#A2D9D3"
          />
          <Text style={styles.commentButtonText}>댓글</Text>
          {/* <Text style={styles.commentCount}>{article.commentCnt}</Text> */}
        </TouchableOpacity>
      );
    } else if (loc == 'detail') {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* 수정 버튼 */}
            <TouchableOpacity
              style={[styles.button, { marginEnd: 5 }]}
              onPress={() => {
                navigation.push('UpdateArticle', article);
              }}
            >
              <Text style={styles.text}>수정</Text>
            </TouchableOpacity>

            {/* 삭제 버튼 */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                remove();
              }}
            >
              <Text style={styles.text}>삭제</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity disabled style={styles.commentButton}>
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={20}
              color="#A2D9D3"
            />
            <Text style={styles.commentButtonText}>댓글</Text>
            {/* <Text style={styles.commentCount}>{article.commentCnt}</Text> */}
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={styles.article}>
      {/* 헤더 */}
      <ArticleCardHeader navigation={navigation} article={article} />

      {/* 제목 */}
      <Text style={styles.title}>{article.title}</Text>

      {/* 글 */}
      <Text style={styles.content} numberOfLines={6} ellipsizeMode={'tail'}>
        {article.contents}
      </Text>

      {/* 각종 버튼 */}
      <View
        style={[
          styles.buttonContainer,
          loc == 'main'
            ? { justifyContent: 'flex-end' }
            : { justifyContent: 'space-between' },
        ]}
      >
        {/* 댓글 */}
        {showCommentButton()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  article: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  title: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 27,
  },
  content: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 27,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: '#FFEDEE',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: '#EB6552',
  },

  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButtonText: {
    fontSize: 13,
    marginLeft: 5,
  },
  commentCount: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  },
});
