// src/screens/RewardsScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../services/firebase';
import RewardCard from '../components/RewardCard';

const RewardsScreen = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      const rewardsCollection = await firestore.collection('rewards').get();
      setRewards(rewardsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchRewards();
  }, []);

  const handleRedeem = (reward) => {
    // Lógica para resgatar a recompensa
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RewardCard reward={item} onRedeem={handleRedeem} />}
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