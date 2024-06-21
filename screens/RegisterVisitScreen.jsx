import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { firestore, auth } from '../services/firebase';
import { collection, query, where, getDocs, updateDoc, doc, increment } from "firebase/firestore";

export function RegisterVisitScreen({ navigation }) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
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
};
