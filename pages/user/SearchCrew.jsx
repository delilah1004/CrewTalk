import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Input } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import Loading from '../Loading';

import CrewCard from '../../components/card/CrewCard';
import { StackSearchButton } from '../../components/button';

import stackList from '../../config/mock/stackList.json';
import { getCrewsByPage, getCrewsByStackByPage } from '../../config/UserAPI';

const WindowWidth = Dimensions.get('window').width;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SearchCrew({ navigation }) {
  const stacks = stackList.stack;
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [select, setSelect] = useState('전체');
  const [crewList, setCrewList] = useState([]);

  const [name, setName] = useState('');
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(() => {
        setReady(false);
        setSelect('전체');
        getCrews(select);
        setReady(true);
      });
    });
  }, []);

  const getCrews = useCallback(async (title) => {
    console.log(title);
    setSelect(title);
    setPageNum(1);
    let result = [];
    if (title == '전체') {
      result = await getCrewsByPage(1);
    } else {
      result = await getCrewsByStackByPage(title, 1);
    }
    setCrewList(result);
  });

  const search = () => {
    navigation.push('CrewList', { name });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return ready ? (
    <View style={styles.container}>
      <FlatList
        data={crewList}
        initialNumToRender={6}
        maxToRenderPerBatch={1}
        refreshing={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View>
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
                contentContainerStyle={styles.stackSearch}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  {stacks.map((title, i) => {
                    return (
                      <StackSearchButton
                        title={title}
                        select={select}
                        doFunction={getCrews}
                        key={i}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          );
        }}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          let nextCrews = [];
          if (select == '전체') {
            nextCrews = await getCrewsByPage(pageNum + 1);
            setPageNum(pageNum + 1);
          } else {
            nextCrews = await getCrewsByStackByPage(select, pageNum + 1);
            setPageNum(pageNum + 1);
          }
          if (nextCrews.length != 0) {
            let allCrews = [...crewList, ...nextCrews];
            setCrewList(allCrews);
          }
        }}
        renderItem={(crew, i) => {
          return <CrewCard navigation={navigation} crew={crew.item} key={i} />;
        }}
        numColumns={2}
        columnWrapperStyle={styles.itemWrapper}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    flex: 1,
    marginTop: getStatusBarHeight(),
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#FFF',
    fontSize: 14,
    height: 50,
    paddingLeft: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ED6653',
    width: 50,
    height: 50,
    marginStart: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stackSearch: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },

  itemWrapper: {
    paddingHorizontal: (WindowWidth * 0.05) / 2,
  },
});
