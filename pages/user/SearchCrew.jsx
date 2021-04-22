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
import { Button, Input } from 'native-base';

import { AntDesign, Ionicons } from '@expo/vector-icons';

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
  let flatListRef;
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

  const scrollTop = () => {
    flatListRef.scrollToOffset({ offset: 0, animated: true });
  };

  return ready ? (
    <View style={styles.container}>
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

      <FlatList
        ref={(ref) => {
          flatListRef = ref;
        }}
        contentContainerStyle={{ paddingVertical: 10 }}
        data={crewList}
        initialNumToRender={6}
        refreshing={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            // Stack 분류
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
      <Button
        style={styles.FAB}
        onPress={() => {
          scrollTop();
        }}
      >
        <AntDesign name="arrowup" size={26} color="black" />
      </Button>
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
    marginBottom: 5,
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
    marginBottom: 10,
  },

  itemWrapper: {
    paddingHorizontal: (WindowWidth * 0.05) / 2,
  },

  FAB: {
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
