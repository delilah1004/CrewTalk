import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

import { deleteArticle } from '../../config/ArticleAPI';

export default function ArticleCardFooter({ navigation, article, userId }) {
  const remove = () => {
    deleteArticle(navigation, article.id);
  };

  if (userId == article.authorId) {
    return (
      <View style={styles.buttonContainer}>
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
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
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
});
