import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Container, Input } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import Loading from '../Loading';
import CrewCard from '../../components/card/CrewCard';
import { StackSearchButton } from '../../components/button';

import stackList from '../../config/mock/stackList.json';
import { getCrewList, getCrewListByStack } from '../../config/UserAPI';

const WindowWidth = Dimensions.get('window').width;

export default function SearchCrew({ navigation }) {
  const stacks = stackList.stack;
  const [ready, setReady] = useState(false);

  const [select, setSelect] = useState('전체');
  const [crewList, setCrewList] = useState([]);

  const [name, setName] = useState('');

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
        setSelect('전체');
        download();
        setReady(true);
      });
    });
    download();
    setReady(true);
  }, []);

  const download = async () => {
    const result = await getCrewList();
    setCrewList(result);
  };

  const getCrews = async (title) => {
    const result = await getCrewListByStack(title);
    setCrewList(result);
  };

  const search = () => {
    navigation.push('CrewList', { name });
  };

  return ready ? (
    <Container style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.content}>
          {/* 검색창 */}
          <View style={styles.searchBar}>
            <Input
              style={styles.input}
              placeholder={'이름으로 검색해보세요.'}
              placeholderTextColor="#AAA"
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <TouchableOpacity style={styles.button} onPress={search}>
              <Ionicons name="search-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Stack 분류 */}
          <ScrollView
            style={{ marginVertical: 20 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <StackSearchButton
                title={'전체'}
                setSelect={setSelect}
                select={select}
                doFunction={download}
              />

              {stacks.map((title, i) => {
                return (
                  <StackSearchButton
                    title={title}
                    setSelect={setSelect}
                    select={select}
                    doFunction={getCrews}
                    key={i}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* 크루원 카드 목록 */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: (WindowWidth * 0.05) / 2,
          }}
        >
          {crewList.map((crew, i) => {
            return <CrewCard navigation={navigation} crew={crew} key={i} />;
          })}
        </View>
      </ScrollView>
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
  },
  content: {
    width: '88%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    marginTop: 20,
    height: 50,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#FFF',
    height: '100%',
    fontSize: 14,
    borderRadius: 5,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ed6653',
    width: 50,
    height: '100%',
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cateContainer: {
    flex: 1,
  },
});
