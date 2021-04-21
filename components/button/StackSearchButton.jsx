import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

export default function StackSearchButton({ title, select, doFunction }) {
  if (title == select) {
    return (
      <TouchableOpacity style={[styles.box, styles.activeBox]}>
        <Text style={[styles.text, styles.activeText]}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.box, styles.defaultBox]}
        onPress={() => {
          doFunction(title);
        }}
      >
        <Text style={[styles.text, styles.defaultText]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultBox: {
    backgroundColor: '#FFF',
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
