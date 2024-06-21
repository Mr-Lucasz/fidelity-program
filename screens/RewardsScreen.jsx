import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { firestore, auth } from '../services/firebase';
import RewardCard from '../components/RewardCard';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const RewardsScreen = () => {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      const rewardsCollection = await firestore.collection('rewards').get();
      setRewards(rewardsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
    if (userPoints >= reward.points) {
      // Atualiza os pontos do usuário
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        points: userPoints - reward.points
      });

      // Lógica para adicionar a recompensa resgatada ao histórico de transações
      await firestore.collection('transactions').add({
        userId: auth.currentUser.uid,
        type: 'reward',
        points: -reward.points,
        timestamp: new Date(),
      });

      // Atualiza os pontos na tela
      setUserPoints(userPoints - reward.points);
      Alert.alert('Recompensa Resgatada', reward.name);
    } else {
      Alert.alert('Pontos Insuficientes', 'Você não tem pontos suficientes para resgatar esta recompensa.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RewardCard
            reward={item}
            onRedeem={() => handleRedeem(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
});

export default RewardsScreen;