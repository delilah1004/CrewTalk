import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default function SignButton({ title, empty, doFunction }) {
  if (empty) {
    return (
      <TouchableHighlight style={[styles.button, styles.disable]}>
        <Text style={styles.text}>{title}</Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'#BA4F41'}
        onPress={() => {
          doFunction();
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ED6653',
    width: '80%',
    padding: 13,
    marginTop: 20,
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
  },
  disable: {
    opacity: 0.5,
  },
  text: {
    color: '#FFF',
    fontSize: 15,
  },
});
