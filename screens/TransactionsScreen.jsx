import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { firestore, auth } from '../services/firebase';
import { TransactionItem } from '../components/TransactionItem';
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { GlobalStyles } from '../styles/GlobalStyles';

export function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsCollection = collection(firestore, 'transactions');
      const q = query(transactionsCollection, where('userId', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      setTransactions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchTransactions();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem transaction={item} />
        )}
        ListEmptyComponent={<Text style={GlobalStyles.text}>Nenhuma transação registrada.</Text>}
      />
    </View>
  );
}

TransactionsScreen.displayName = 'TransactionsScreen';