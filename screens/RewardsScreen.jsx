import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore, auth } from '../services/firebase';
import { RewardCard } from '../components/RewardCard';
import { getDoc, doc, updateDoc, collection, getDocs, addDoc } from 'firebase/firestore';

export function RewardsScreen() {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      const rewardsCollection = collection(firestore, 'rewards');
      const rewardsSnapshot = await getDocs(rewardsCollection);
      setRewards(rewardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchUserPoints = async () => {
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      setUserPoints(userDoc.data().points);
    };

    fetchRewards();
    fetchUserPoints();
  }, []);

  const handleRedeem = async (reward) => {
    console.log(`Tentando resgatar a recompensa: ${reward.name}`);
    return new Promise((resolve) => {
      Alert.alert(
        "Confirmar Resgate",
        `Você deseja resgatar a recompensa "${reward.name}" por ${reward.points} pontos?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => resolve(false)
          },
          {
            text: "Confirmar",
            onPress: async () => {
              if (userPoints >= reward.points) {
                console.log(`Pontos antes do resgate: ${userPoints}`);
                const userRef = doc(firestore, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                  points: userPoints - reward.points
                });

                // Adiciona a transação
                await addDoc(collection(firestore, 'transactions'), {
                  userId: auth.currentUser.uid,
                  type: 'reward',
                  points: -reward.points,
                  timestamp: new Date(),
                });

                setUserPoints(userPoints - reward.points);
                console.log(`Pontos depois do resgate: ${userPoints - reward.points}`);
                Alert.alert('Recompensa Resgatada', reward.name);
                resolve(true);
              } else {
                Alert.alert('Pontos Insuficientes', 'Você não tem pontos suficientes para resgatar esta recompensa.');
                resolve(false);
              }
            }
          }
        ]
      );
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RewardCard
            reward={item}
            onRedeem={handleRedeem}
          />
        )}
      />
    </View>
  );
}

RewardsScreen.displayName = 'RewardsScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
});