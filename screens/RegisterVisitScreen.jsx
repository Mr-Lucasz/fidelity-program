import React, { useState, useEffect } from "react";
import { View, Button, Alert, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
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
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  if (permission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={() => requestPermission()} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );

  function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Aqui você pode adicionar a lógica para lidar com o código de barras escaneado
  }

  async function requestPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status === "granted");
  }
}

RegisterVisitScreen.displayName = "RegisterVisitScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});