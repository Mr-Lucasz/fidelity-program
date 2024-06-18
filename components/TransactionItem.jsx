// src/components/TransactionItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionItem = ({ transaction }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.item}>
      <Text style={styles.type}>{transaction.type}</Text>
      <Text style={styles.points}>Pontos: {transaction.points}</Text>
      <Text style={styles.date}>{formatDate(transaction.timestamp)}</Text>
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
  date: {
    fontSize: 14,
    color: '#AAA',
  },
});

export default TransactionItem;