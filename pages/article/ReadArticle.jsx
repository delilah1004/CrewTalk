import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Footer, Input, Text, View } from 'native-base';

import ArticleCard from '../../components/card/ArticleCard';

export default function ReadArticle({ navigation, route }) {
  const article = route.params;
  const [currentComment, setCurrentComment] = useState('');

  const commentUpload = async () => {
    const result = await createComment(postId, currentComment);
    if (result) {
      await Alert.alert('댓글 작성 완료!');
      setCurrentComment('');
      download();
    } else {
      Alert.alert('댓글 작성 실패');
    }
  };

  const showButton = () => {
    if (currentComment == '') {
      return (
        <TouchableOpacity disabled style={[styles.addButton, styles.disabled]}>
          <Text style={styles.addButtonText}>등록</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            commentUpload();
          }}
        >
          <Text style={styles.addButtonText}>등록</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Container style={styles.container}>
      <ScrollView>
        {/* 게시글 상세 */}
        <ArticleCard navigation={navigation} article={article} loc={'detail'} />

        {/* 댓글 목록 */}
        <View style={{ paddingBottom: 10 }}>
          {/* {article.comment.map((comment, i) => {
            return (
              <CommentComponent
                navigation={navigation}
                comment={comment}
                key={i}
              />
            );
          })} */}
        </View>
      </ScrollView>

      {/* 댓글 작성란 */}
      <Footer style={styles.commentBox}>
        <Input
          style={styles.input}
          placeholder="게시물에 대해 이야기를 나눠보세요"
          placeholderTextColor="#999"
          value={currentComment}
          onChangeText={(text) => {
            setCurrentComment(text);
          }}
        />
        {showButton()}
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    justifyContent: 'center',
  },

  commentBox: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DBDBDB',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 20,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#ed6653',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 10,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 14,
    color: 'white',
  },
});
