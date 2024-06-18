// src/screens/TransactionsScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { firestore, auth } from '../services/firebase';
import TransactionItem from '../components/TransactionItem';

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsCollection = await firestore.collection('transactions')
        .where('user_id', '==', auth.currentUser.uid)
        .get();
      setTransactions(transactionsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
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

export default TransactionsScreen;