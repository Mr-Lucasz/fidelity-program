import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { auth, firestore } from "../services/firebase";
import { collection, addDoc, updateDoc, doc, getDoc, increment } from "firebase/firestore";
import { GlobalStyles } from '../styles/GlobalStyles';

export function RegisterVisitScreen() {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      // Debugging Step: Log the scanned data
      console.log(`Scanned data: ${data}`);
      
      const qrDoc = await getDoc(doc(firestore, "qrCodes", data));
      if (qrDoc.exists) {
        const qrData = qrDoc.data();
        const userRef = doc(firestore, "users", auth.currentUser.uid);

        await updateDoc(userRef, {
          points: increment(qrData.pointsRedeem)
        });

        await addDoc(collection(firestore, "transactions"), {
          userId: auth.currentUser.uid,
          type: "visit",
          pointsRedeemed: qrData.pointsRedeem,
          timestamp: new Date(),
          rewardId: null,
          transactionName: `Visita - ${qrData.pointsRedeem} pontos`
        });

        Alert.alert('Sucesso', 'Visita registrada com sucesso!');
      } else {
        Alert.alert('Erro', 'QR Code inválido.');
      }
    } catch (error) {
      console.error("Erro ao registrar visita:", error);
      Alert.alert('Erro', 'Erro ao registrar visita.');
    }
  };

  const simulateScan = () => {
    handleBarCodeScanned({ type: 'qr', data: 'qrCodeId1' });
  };

  useEffect(() => {
    if (hasPermission?.status === 'undetermined') {
      requestPermission();
    }
  }, [hasPermission]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <CameraView 
        style={{ flex: 1 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <View style={styles.buttonContainer}>
          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          )}
        </View>
      </CameraView>
      <TouchableOpacity style={GlobalStyles.button} onPress={simulateScan}>
        <Text style={GlobalStyles.buttonText}>Scanner</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});