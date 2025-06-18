// src/screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../services/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { GlobalStyles } from '../styles/GlobalStyles';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('Email inválido').required('Email obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
});

export function RegisterScreen  ({ navigation })  {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Adiciona o nome do usuário ao Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        name: values.name,
        email: values.email,
        points: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setLoading(false);
      navigation.navigate('Profile');
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Este email já está sendo usado por outra conta.',
        });
      } else {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao registrar',
          text2: error.message,
        });
      }
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.title}>Registrar</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="Nome"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            accessibilityLabel="Nome"
          />
          {errors.name && touched.name && (
            <Text style={GlobalStyles.errorText}>{errors.name}</Text>
          )}
          <TextInput
            style={GlobalStyles.input}
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            keyboardType="email-address"
            accessibilityLabel="Email"
            autoCapitalize="none"
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
          {loading ? (
            <ActivityIndicator size="large" color={GlobalStyles.button.backgroundColor || '#0000ff'} />
          ) : (
            <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}>
              <Text style={GlobalStyles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          )}
          <Text style={GlobalStyles.text} onPress={() => navigation.navigate('Login')}>
            Já tem uma conta? Faça login aqui
          </Text>
        </View>
      )}
    </Formik>
  );
};

export default RegisterScreen;
