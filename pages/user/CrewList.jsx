import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Container, Text, Button, Header } from 'native-base';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import Loading from '../Loading';

import CrewCard from '../../components/card/CrewCard';

import { getCrewsByNameByPage } from '../../config/UserAPI';

const WindowWidth = Dimensions.get('window').width;

export default function CrewList({ navigation, route }) {
  const name = route.params.name;

  let flatListRef;

  const [ready, setReady] = useState(false);

  const [crewList, setCrewList] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      download();
      setReady(true);
    });
  }, []);

  const download = async () => {
    const result = await getCrewsByNameByPage(name, pageNum);
    setCrewList(result);
  };

  const scrollTop = () => {
    flatListRef.scrollToOffset({ offset: 0, animated: true });
  };

  return ready ? (
    <Container style={styles.container}>
      {/* 헤더 */}
      <Header style={styles.header} transparent>
        <View>
          <Button transparent onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color="grey" size={26} />
          </Button>
        </View>

        <View>
          <Text style={styles.headerTitle}>'{name}' 검색 결과</Text>
        </View>

        <View>
          <Button transparent>
            <Ionicons name="chevron-back" color="transparent" size={26} />
          </Button>
        </View>
      </Header>

      {crewList.length == 0 ? (
        // 크루원 없을 때 멘트
        <View
          style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
        >
          <Text>해당하는 크루원이 없습니다.</Text>
        </View>
      ) : (
        // 크루원 카드 목록
        <FlatList
          ref={(ref) => {
            flatListRef = ref;
          }}
          contentContainerStyle={{ paddingVertical: 10 }}
          data={crewList}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={async () => {
            let nextCrews = await getCrewsByNameByPage(name, pageNum + 1);
            setPageNum(pageNum + 1);
            if (nextCrews.length != 0) {
              let allCrews = [...crewList, ...nextCrews];
              setCrewList(allCrews);
            }
          }}
          renderItem={(crew, i) => {
            return (
              <CrewCard navigation={navigation} crew={crew.item} key={i} />
            );
          }}
          numColumns={2}
          columnWrapperStyle={styles.itemWrapper}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <Button
        style={styles.FAB}
        onPress={() => {
          scrollTop();
        }}
      >
        <AntDesign name="arrowup" size={26} color="black" />
      </Button>
    </Container>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },

  // 헤더
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#EEE',
    width: '90%',
    padding: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
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
