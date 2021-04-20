import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Footer, Input, Text, View } from 'native-base';

import Loading from '../../pages/Loading';
import ArticleCard from '../../components/card/ArticleCard';
import { CommentItem } from '../../components/item';

import { createComment, getComments } from '../../config/CommentAPI';

export default function ReadArticle({ navigation, route }) {
  const data = route.params;

  const [ready, setReady] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      download();
    });
    setReady(true);
  }, [navigation]);

  const download = async () => {
    const result = await getComments(data.article.id);
    setComments(result);
  };

  const commentUpload = async () => {
    const result = await createComment(data.article.id, currentComment);
    if (result) {
      setCurrentComment('');
      download();
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

  return ready ? (
    <Container style={styles.container}>
      <ScrollView>
        {/* 게시글 상세 */}
        <ArticleCard
          navigation={navigation}
          article={data.article}
          loc={'detail'}
          userId={data.userId}
        />

        {/* 댓글 목록 */}
        <View>
          {comments.map((comment, i) => {
            return (
              <CommentItem
                navigation={navigation}
                comment={comment}
                userId={data.userId}
                download={download}
                key={i}
              />
            );
          })}
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
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
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
