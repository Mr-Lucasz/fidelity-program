// src/screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../services/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialIcons';

export function RegisterScreen  ({ navigation })  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "O formato do email é inválido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Adiciona o nome do usuário ao Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        name: name,
        email: email,
        points: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setLoading(false);
      navigation.navigate("Profile");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Este email já está sendo usado por outra conta.");
      } else {
        console.error(error);
        Alert.alert("Erro ao registrar", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Nome"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      )}
      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate("Login")}
      >
        Já tem uma conta? Faça login aqui
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
  icon: {
    position: 'absolute',
    right: 10,
    marginTop: 12,
  },
});

export default RegisterScreen;
