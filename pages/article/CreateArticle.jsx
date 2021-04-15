import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, View, Text, Header, Form, Textarea } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { CUButton } from '../../components/button';

const upload = () => {};

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const button = () => {
    if (title == '' || content == '') {
      return <CUButton title={'작성 완료'} empty={true} />;
    } else {
      return <CUButton title={'작성 완료'} empty={false} doFunction={upload} />;
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#FFF' }}>
      {/* 헤더 */}
      <Header style={styles.header} transparent>
        <View>
          <Button
            style={styles.back}
            transparent
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" color="grey" size={26} />
          </Button>
        </View>

        <View>
          <Text style={{ textAlign: 'center' }}>게시글 업로드</Text>
        </View>

        <View>
          <Button disabled transparent>
            <Ionicons name="chevron-back" color="transparent" size={26} />
          </Button>
        </View>
      </Header>

      {/* 바디 */}
      <View style={styles.container}>
        <Form style={styles.form}>
          {/* 제목 */}
          <View style={styles.url}>
            <Text style={styles.label}>제목</Text>
          </View>
          <Textarea
            style={styles.title}
            placeholder={'제목을 입력해주세요.'}
            placeholderTextColor="#AAA"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />

          {/* 내용 */}
          <Text style={styles.label}>내용</Text>
          <Textarea
            style={styles.content}
            rowSpan={10}
            borderRadius={5}
            value={content}
            placeholder="함께 나누고 싶은 생각을 적어주세요"
            placeholderTextColor="#AAA"
            onChangeText={(text) => {
              setContent(text);
            }}
          />
        </Form>

        {/* 작성 버튼 */}
        {button()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  form: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 5,
    color: '#000',
  },
  title: {
    width: '100%',
    padding: 18,
    marginBottom: 20,
    fontSize: 15,
    borderRadius: 5,
    borderWidth: 1,
    color: 'black',
    borderColor: '#DBDBDB',
    alignSelf: 'center',
  },
  content: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  button: {
    width: 70,
    height: 30,
    marginEnd: 15,
    backgroundColor: 'pink',
    borderRadius: 5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
});
