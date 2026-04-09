// src/firebase/db.js
import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);