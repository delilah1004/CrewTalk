import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Thumbnail, View } from 'native-base';

const img = require('../../assets/mask_lion.jpg');

const ViewWidth = Dimensions.get('window').width;
const CardWidth = ViewWidth * 0.5;

export default function CrewCard({ navigation, crew }) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.push('CrewInfo', crew.username);
      }}
    >
      <View style={styles.card}>
        <Thumbnail small source={img} style={styles.cardImage} />
        <Text style={styles.name}>{crew.name}</Text>
        <Text style={styles.stack} numberOfLines={1}>
          {crew.stack}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: (ViewWidth * 0.95) / 2,
    padding: 7,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: CardWidth * 0.5,
    height: CardWidth * 0.5,
    borderRadius: 50,
  },
  name: {
    marginVertical: 10,
    fontWeight: '700',
  },
  stack: {
    marginBottom: 10,
  },
});
