// src/components/TransactionItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function TransactionItem ({ transaction }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{transaction.transactionName}</Text>
      <Text style={styles.points}>Pontos: {transaction.pointsRedeemed}</Text>
      <Text style={styles.timestamp}>{new Date(transaction.timestamp.seconds * 1000).toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
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
  type: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 16,
    color: '#888',
    marginVertical: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#AAA',
  },
});

