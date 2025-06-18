// src/components/TransactionItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

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
    backgroundColor: GlobalStyles.container.backgroundColor,
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
    fontSize: GlobalStyles.title.fontSize,
    fontWeight: GlobalStyles.title.fontWeight,
    color: GlobalStyles.title.color,
  },
  points: {
    fontSize: GlobalStyles.text.fontSize,
    color: GlobalStyles.text.color,
    marginVertical: 8,
  },
  timestamp: {
    fontSize: GlobalStyles.text.fontSize,
    color: GlobalStyles.text.color,
  },
});

