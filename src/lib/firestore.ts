import { doc, serverTimestamp, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export type StudentProfileInput = {
  account: string;
  displayName: string;
  className: string;
  school: string;
  province: string;
  email: string;
};

export async function bootstrapUser(uid: string, profile: StudentProfileInput) {
  const userRef = doc(db, 'users', uid);
  const progressRef = doc(db, 'progress', uid);
  const accountRef = doc(db, 'usernames', profile.account.toLowerCase());

  // Không đọc trước để tránh lỗi permission ở các rules chỉ cho phép write.
  await setDoc(
    userRef,
    {
      account: profile.account.toLowerCase(),
      displayName: profile.displayName,
      className: profile.className,
      school: profile.school,
      province: profile.province,
      email: profile.email,
      createdAt: serverTimestamp(),
      totalPoints: 0
    },
    { merge: true }
  );

  await setDoc(
    progressRef,
    {
      modules: {},
      streak: 0
    },
    { merge: true }
  );

  await setDoc(
    accountRef,
    {
      uid,
      email: profile.email,
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function completeModule(uid: string, moduleId: string, points: number) {
  const progressRef = doc(db, 'progress', uid);
  const userRef = doc(db, 'users', uid);

  await setDoc(
    progressRef,
    {
      modules: {
        [moduleId]: { completed: true, points, updatedAt: serverTimestamp() }
      }
    },
    { merge: true }
  );

  const current = await getDoc(userRef);
  const existing = (current.data()?.totalPoints as number | undefined) ?? 0;
  await updateDoc(userRef, { totalPoints: existing + points });
}
