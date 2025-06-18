import { firestore } from '../services/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export async function getAllRewards() {
  const rewardsCol = collection(firestore, 'rewards');
  const rewardsSnap = await getDocs(rewardsCol);
  return rewardsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function redeemReward(rewardId, userId) {
  // Exemplo: marca o reward como resgatado pelo usuário
  const rewardRef = doc(firestore, 'rewards', rewardId);
  await updateDoc(rewardRef, { redeemedBy: userId });
}
