// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Adiciona o nome do usuário ao Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        name: name,
        points: 0,
      });
  
      navigation.navigate('Profile');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Este email já está sendo usado por outra conta.');
      } else {
        console.error(error);
        alert('Erro ao registrar: ' + error.message);
      }
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;