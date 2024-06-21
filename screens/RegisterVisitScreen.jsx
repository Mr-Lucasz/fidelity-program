// src/screens/RegisterVisitScreen.js
import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firestore, auth } from '../services/firebase';

export function RegisterVisitScreen  ({ navigation })  {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const qrCodeData = JSON.parse(data);
  
    // Validação no Firestore
    const querySnapshot = await firestore.collection('qrCodes')
      .where('id', '==', qrCodeData.id)
      .where('timestamp', '==', qrCodeData.timestamp)
      .where('used', '==', false)
      .get();
  
    if (!querySnapshot.empty) {
      const userRef = firestore.doc(`users/${auth.currentUser.uid}`);
      await userRef.update({
        points: firebase.firestore.FieldValue.increment(10),
      });
  
      // Marcar QR Code como usado
      const qrCodeDoc = querySnapshot.docs[0];
      await qrCodeDoc.ref.update({ used: true });
  
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && <Button title="Escanear novamente" onPress={() => setScanned(false)} />}
    </View>
  );
};

export default RegisterVisitScreen;