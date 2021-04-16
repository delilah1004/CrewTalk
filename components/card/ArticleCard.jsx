import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import ArticleCardHeader from './ArticleCardHeader';

export default function ArticleCard({ navigation, article, loc }) {
  const showCommentButton = () => {
    if (loc == 'main') {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push('ReadArticle', article);
          }}
        >
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={20}
            color="#A2D9D3"
          />
          <Text style={styles.buttonText}>댓글</Text>
          {/* <Text style={styles.number}>{article.commentCnt}</Text> */}
        </TouchableOpacity>
      );
    } else if (loc == 'detail') {
      return (
        <TouchableOpacity disabled style={styles.button}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={20}
            color="#A2D9D3"
          />
          <Text style={styles.buttonText}>댓글</Text>
          {/* <Text style={styles.number}>{article.commentCnt}</Text> */}
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.article}>
      {/* 헤더 */}
      <ArticleCardHeader navigation={navigation} article={article} loc={loc} />

      {/* 제목 */}
      <Text style={styles.title}>{article.title}</Text>

      {/* 글 */}
      <Text style={styles.content} numberOfLines={6} ellipsizeMode={'tail'}>
        {article.contents}
      </Text>

      {/* 각종 버튼 */}
      <View style={styles.buttonContainer}>
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
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    marginLeft: 5,
  },
  number: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  },
});
