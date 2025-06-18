import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GlobalStyles } from "../styles/GlobalStyles";

export function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loggout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Erro", "Não foi possível deslogar.");
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(
          doc(firestore, "users", auth.currentUser.uid)
        );
        setUser(userDoc.data());
        setPoints(userDoc.data().points);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <View style={GlobalStyles.container}>
        <ActivityIndicator
          size="large"
          color={GlobalStyles.button.backgroundColor}
        />
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 0, right: 10 }}
        onPress={() => {
          loggout();
        }}
      >
        <Ionicons name="exit" size={30} color="#000" />
      </TouchableOpacity>

      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 20,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text style={GlobalStyles.title}>Nome: {user?.name}</Text>
        <Text style={GlobalStyles.text}>Saldo de Pontos: {points}</Text>
      </View>
      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => navigation.navigate("RegisterVisit")}
      >
        <Text style={GlobalStyles.buttonText}>Registrar Visita</Text>
      </TouchableOpacity>
    </View>
  );
}

ProfileScreen.displayName = "ProfileScreen";
