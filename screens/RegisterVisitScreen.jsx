import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Camera } from "expo-camera";
import * as Permissions from 'expo-permissions';
import { auth, firestore } from "../services/firebase";
import {
  collection,
  query,
  where,
  updateDoc,
  increment,
  getDocs,
  doc,
} from "firebase/firestore";

export function RegisterVisitScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      {scannedData ? <Text style={styles.scannedData}>{scannedData}</Text> : null}
    </View>
  );
};

RegisterVisitScreen.displayName = "RegisterVisitScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedData: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
});