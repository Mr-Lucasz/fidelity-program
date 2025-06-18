import { firestore } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function getUserProfile(uid) {
  const userRef = doc(firestore, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
}

export async function updateUserPoints(uid, points) {
  const userRef = doc(firestore, 'users', uid);
  await updateDoc(userRef, { points });
}
