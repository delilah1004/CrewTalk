import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

export default function StackButton({ title, setStack, currentStack }) {
  if (title == currentStack) {
    return (
      <TouchableOpacity
        style={[styles.box, styles.activeBox]}
        onPress={() => {
          setStack(title);
        }}
      >
        <Text style={[styles.text, styles.activeText]}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.box, styles.defaultBox]}
        onPress={() => {
          setStack(title);
        }}
      >
        <Text style={[styles.text, styles.defaultText]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: '45%',
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultBox: {
    backgroundColor: '#EEE',
  },
  activeBox: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 15,
  },
  defaultText: {
    color: '#555',
  },
  activeText: {
    color: '#FFF',
    fontWeight: '700',
  },
});
