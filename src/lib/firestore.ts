import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export type StudentProfileInput = {
  account: string;
  displayName: string;
  className: string;
  school: string;
  province: string;
  email: string;
};

export async function isAccountTaken(account: string) {
  const accountRef = doc(db, 'usernames', account.toLowerCase());
  const snapshot = await getDoc(accountRef);
  return snapshot.exists();
}

export async function findEmailByAccount(account: string) {
  const accountRef = doc(db, 'usernames', account.toLowerCase());
  const snapshot = await getDoc(accountRef);
  if (!snapshot.exists()) return null;
  return snapshot.data().email as string;
}

export async function bootstrapUser(uid: string, profile: StudentProfileInput) {
  const userRef = doc(db, 'users', uid);
  const progressRef = doc(db, 'progress', uid);
  const accountRef = doc(db, 'usernames', profile.account.toLowerCase());

  const uSnap = await getDoc(userRef);
  if (!uSnap.exists()) {
    await setDoc(userRef, {
      account: profile.account.toLowerCase(),
      displayName: profile.displayName,
      className: profile.className,
      school: profile.school,
      province: profile.province,
      email: profile.email,
      createdAt: serverTimestamp(),
      totalPoints: 0
    });
  }

  const pSnap = await getDoc(progressRef);
  if (!pSnap.exists()) {
    await setDoc(progressRef, { modules: {}, streak: 0 });
  }

  const aSnap = await getDoc(accountRef);
  if (!aSnap.exists()) {
    await setDoc(accountRef, {
      uid,
      email: profile.email,
      createdAt: serverTimestamp()
    });
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
