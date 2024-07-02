import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function RewardCard({ reward, onRedeem }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{reward.name}</Text>
      <Text style={styles.points}>Pontos: {reward.points}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onRedeem(reward)}>
        <Text style={styles.buttonText}>Resgatar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  points: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});