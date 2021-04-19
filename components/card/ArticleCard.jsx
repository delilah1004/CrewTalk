import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';

import ArticleCardHeader from './ArticleCardHeader';
import MainCardFooter from './MainCardFooter';
import DetailCardFooter from './DetailCardFooter';

export default function ArticleCard({ navigation, article, loc, userId }) {
  const showFooter = () => {
    if (loc === 'main') {
      return (
        <MainCardFooter
          navigation={navigation}
          article={article}
          userId={userId}
        />
      );
    } else if (loc === 'detail') {
      return (
        <DetailCardFooter
          navigation={navigation}
          article={article}
          userId={userId}
        />
      );
    }
  };

  return (
    <View style={styles.article}>
      {/* Header */}
      <ArticleCardHeader navigation={navigation} article={article} />

      {/* 제목 */}
      <Text style={styles.title}>{article.title}</Text>

      {/* 글 */}
      <Text style={styles.content} numberOfLines={6} ellipsizeMode={'tail'}>
        {article.contents}
      </Text>

      {/* Footer */}
      {showFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  article: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 10,
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
});
