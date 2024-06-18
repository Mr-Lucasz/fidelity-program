// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'O formato do email é inválido.');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao fazer login', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        accessibilityLabel="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        accessibilityLabel="Senha"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} />
          <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
            Não tem uma conta? Registre-se aqui
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  registerText: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;