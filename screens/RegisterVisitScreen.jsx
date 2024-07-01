// RegisterVisitScreen.js
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { auth, firestore } from '../services/firebase'; 
import { collection, query, where, updateDoc, increment, getDocs, doc } from "firebase/firestore";

export function RegisterVisitScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      console.log('Requesting camera permissions...');
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log('Camera permission status:', status);
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const qrCodeData = JSON.parse(data);

      // Firestore validation
      const q = query(
        collection(firestore, 'qrCodes'),
        where('id', '==', qrCodeData.id),
        where('timestamp', '==', qrCodeData.timestamp),
        where('used', '==', false)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userRef = doc(firestore, `users/${auth.currentUser.uid}`);
        await updateDoc(userRef, {
          points: increment(10),
        });

        // Mark QR Code as used
        const qrCodeDoc = querySnapshot.docs[0];
        await updateDoc(qrCodeDoc.ref, { used: true });

        Alert.alert('Visita registrada com sucesso!');
        navigation.navigate('Profile');
      } else {
        Alert.alert('QR Code inválido ou expirado!');
      }
    } catch (error) {
      console.error('Error scanning QR code:', error);
      Alert.alert('Erro ao processar o QR Code.');
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && <Button title="Escanear novamente" onPress={() => setScanned(false)} />}
    </View>
  );
}