// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        accessibilityLabel="Email"
      />
            <View style={styles.passwordContainer}>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
        accessibilityLabel="Senha"
      />
         <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.switchText} onPress={() => navigation.navigate('Register')}>
        Não tem uma conta? Registre-se aqui
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    right: 10,
    marginTop: 12,
  },
});
