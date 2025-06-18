// src/components/Input.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <TextInput
    style={GlobalStyles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

export default Input;