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