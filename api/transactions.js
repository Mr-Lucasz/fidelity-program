import { firestore } from '../services/firebase';
import { collection, getDocs, addDoc, query, where, orderBy } from 'firebase/firestore';

export async function getUserTransactions(userId) {
  const q = query(
    collection(firestore, 'transactions'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addTransaction(data) {
  const transactionsCol = collection(firestore, 'transactions');
  const docRef = await addDoc(transactionsCol, data);
  return docRef.id;
}
