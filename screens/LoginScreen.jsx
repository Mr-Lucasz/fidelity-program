// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { GlobalStyles } from '../styles/GlobalStyles';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
});

export function LoginScreen ({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: 'Senha ou Email inválido',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.title}>Login</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            accessibilityLabel="Email"
          />
          {errors.email && touched.email && (
            <Text style={GlobalStyles.errorText}>{errors.email}</Text>
          )}
          <View style={{ position: 'relative' }}>
            <TextInput
              style={GlobalStyles.input}
              placeholder="Senha"
              value={values.password}
              secureTextEntry={!showPassword}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              accessibilityLabel="Senha"
            />
            <TouchableOpacity style={{ position: 'absolute', right: 10, top: 18 }} onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="grey" />
            </TouchableOpacity>
          </View>
          {errors.password && touched.password && (
            <Text style={GlobalStyles.errorText}>{errors.password}</Text>
          )}
          {isLoading ? (
            <ActivityIndicator size="large" color={GlobalStyles.button.backgroundColor || '#0000ff'} />
          ) : (
            <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}>
              <Text style={GlobalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
          <Text style={GlobalStyles.text} onPress={() => navigation.navigate('Register')}>
            Não tem uma conta? Registre-se aqui
          </Text>
        </View>
      )}
    </Formik>
  );
};
