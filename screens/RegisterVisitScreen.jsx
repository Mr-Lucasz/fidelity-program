import React, { useState, useEffect } from "react";
import { View, Button, Alert, Text, StyleSheet } from "react-native";
import { CameraView,  useCameraPermissions } from "expo-camera";
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
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
     permission(status === "granted");
    })();
  }, []);

  if (!permission) {
    return <Text>No access to camera</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <CameraView style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

RegisterVisitScreen.displayName = "RegisterVisitScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
