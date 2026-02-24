import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function bootstrapUser(uid: string, email: string, displayName: string) {
  const userRef = doc(db, 'users', uid);
  const progressRef = doc(db, 'progress', uid);
  const uSnap = await getDoc(userRef);
  if (!uSnap.exists()) {
    await setDoc(userRef, { displayName, email, createdAt: serverTimestamp(), totalPoints: 0 });
  }
  const pSnap = await getDoc(progressRef);
  if (!pSnap.exists()) {
    await setDoc(progressRef, { modules: {}, streak: 0 });
  }
}

export async function completeModule(uid: string, moduleId: string, points: number) {
  const progressRef = doc(db, 'progress', uid);
  const userRef = doc(db, 'users', uid);

  await updateDoc(progressRef, {
    [`modules.${moduleId}`]: { completed: true, points, updatedAt: serverTimestamp() }
  });

  const current = await getDoc(userRef);
  const existing = (current.data()?.totalPoints as number | undefined) ?? 0;
  await updateDoc(userRef, { totalPoints: existing + points });
}
