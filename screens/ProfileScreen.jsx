// src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { auth, firestore } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
        setUser(userDoc.data());
        setPoints(userDoc.data().points);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View>
      <Text>Nome: {user?.name}</Text>
      <Text>Saldo de Pontos: {points}</Text>
      <Button title="Registrar Visita" onPress={() => navigation.navigate('RegisterVisit')} />
    </View>
  );
};

export default ProfileScreen;