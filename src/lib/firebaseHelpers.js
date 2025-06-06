import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

export async function createRoom(code, data) {
  const ref = doc(db, "rooms", code);
  await setDoc(ref, data);
}

export async function joinRoom(code, data) {
  const ref = doc(db, "rooms", code);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { ...data, joiner: data.joiner });  // Ensure all data is included
    return true;
  }
  return false;
}

export async function updateRoom(code, data) {
  const ref = doc(db, "rooms", code);
  await updateDoc(ref, data);
}

export function listenToRoom(code, callback) {
  if (!code || typeof code !== "string") {
    console.warn("Invalid room code passed to listenToRoom:", code);
    return;
  }
  const ref = doc(db, "rooms", code);
  return onSnapshot(ref, (doc) => {
    callback(doc.data());
  });
}

export async function getRoom(code) {
  const ref = doc(db, "rooms", code);
  const snapshot = await getDoc(ref);
  return snapshot.data();
}
