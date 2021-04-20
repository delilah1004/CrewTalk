import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Thumbnail, View } from 'native-base';

import { deleteComment } from '../../config/CommentAPI';

const img = require('../../assets/mask_lion.jpg');

const WindowWidth = Dimensions.get('window').width;
const ThumbSize = WindowWidth * 0.1;

export default function CommentItem({ navigation, comment, userId, download }) {
  const remove = async () => {
    await deleteComment(comment.id);
    download();
  };

  const showFooter = () => {
    if (userId == comment.cmtUserId) {
      return (
        <View style={styles.buttonContainer}>
          {/* 수정 버튼 */}
          <Text style={styles.text}>수정</Text>

          {/* 삭제 버튼 */}
          <Text
            style={styles.text}
            onPress={() => {
              remove();
            }}
          >
            삭제
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {/* 댓글 작성자 이미지 */}
        <TouchableOpacity
          onPress={() => {
            navigation.push('MemberInfo', comment.username);
          }}
        >
          <Thumbnail style={styles.thumbnail} source={img} />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          {/* 댓글 작성자 이름 */}
          <Text style={styles.authorName}>
            {comment.cmtUsername} ({comment.cmtUserId})
          </Text>

          {/* 댓글 작성자 스택 */}
          <Text style={styles.authorStack}>{comment.stack}</Text>

          {/* 댓글 내용 */}
          <Text style={styles.comment} numberOfLines={3}>
            {comment.comments}
          </Text>
        </View>
      </View>

      {showFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  thumbnail: {
    width: ThumbSize,
    height: ThumbSize,
  },
  infoBox: {
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  authorName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  authorStack: {
    color: '#999',
    marginVertical: 5,
    fontSize: 12,
  },
  comment: {
    lineHeight: 27,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#EB6552',
    fontSize: 13,
    marginEnd: 10,
  },
});
