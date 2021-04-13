import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input, Item } from 'native-base';

export default function SignInput({ label, value, type, hint, setValue }) {
  return (
    <View style={{ width: '80%' }}>
      <Text style={styles.label}>{label}</Text>
      <Item regular style={styles.inputBox}>
        <Input
          style={value == '' ? styles.hint : styles.input}
          // type이 패스워드면 화면상에 텍스트가 안보이게 처리하는 속성
          secureTextEntry={type == 'password' ? true : false}
          placeholder={hint}
          placeholderTextColor={'#111'}
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
        />
      </Item>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#263238',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputBox: {
    paddingLeft: 5,
    marginBottom: 30,
    borderRadius: 4,
    borderColor: '#999',
    alignSelf: 'center',
    alignItems: 'center',
  },
  hint: {
    opacity: 0.4,
  },
  input: {
    opacity: 1,
  },
});
