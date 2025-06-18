import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

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
    backgroundColor: GlobalStyles.container.backgroundColor,
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
    fontSize: GlobalStyles.title.fontSize,
    fontWeight: GlobalStyles.title.fontWeight,
    marginBottom: 8,
    color: GlobalStyles.title.color,
  },
  points: {
    fontSize: GlobalStyles.text.fontSize,
    marginBottom: 8,
    color: GlobalStyles.text.color,
  },
  button: GlobalStyles.button,
  buttonText: GlobalStyles.buttonText,
});