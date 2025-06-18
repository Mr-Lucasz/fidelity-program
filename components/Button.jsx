// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const Button = ({ onPress, title }) => (
  <TouchableOpacity style={GlobalStyles.button} onPress={onPress}>
    <Text style={GlobalStyles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default Button;