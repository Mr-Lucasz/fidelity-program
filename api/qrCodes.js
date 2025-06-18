import { firestore } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getQrCodeDetails(qrCodeId) {
  const qrRef = doc(firestore, 'qrCodes', qrCodeId);
  const qrSnap = await getDoc(qrRef);
  return qrSnap.exists() ? qrSnap.data() : null;
}
