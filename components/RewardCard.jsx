import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export function RewardCard({ reward, onRedeem }) {
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeemPress = async () => {
    setIsRedeeming(true);
    try {
      const success = await Promise.race([
        onRedeem(reward),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
      ]);
      if (!success) {
        alert('Falha ao resgatar a recompensa.');
      }
    } catch (error) {
      alert('Erro ao tentar resgatar a recompensa.');
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{reward.name}</Text>
      <Text style={styles.points}>Pontos: {reward.points}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleRedeemPress}
        disabled={isRedeeming}
      >
        {isRedeeming ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Resgatar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 16,
    color: '#888',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});