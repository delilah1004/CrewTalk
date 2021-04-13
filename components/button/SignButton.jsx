import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default function SignButton({ title, empty }) {
  return (
    <TouchableHighlight
      style={empty ? [styles.button, styles.disable] : styles.button}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ed6653',
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
