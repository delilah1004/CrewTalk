import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MainCardFooter({ navigation, article, userId }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => {
          navigation.push('ReadArticle', { article, userId });
        }}
      >
        <MaterialCommunityIcons
          name="comment-processing-outline"
          size={20}
          color="#A2D9D3"
        />
        <Text style={styles.commentButtonText}>댓글</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
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
