import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          loggout();
        }}
      >
        <Ionicons name="exit" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.profileCard}>
        <Text style={styles.username}>Nome: {user?.name}</Text>
        <Text style={styles.points}>Saldo de Pontos: {points}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RegisterVisit")}
      >
        <Text style={styles.buttonText}>Registrar Visita</Text>
      </TouchableOpacity>
    </View>
  );
}

ProfileScreen.displayName = "ProfileScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  logoutButton: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  username: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  points: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
