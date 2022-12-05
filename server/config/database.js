import admin from 'firebase-admin'
import serviceAccount from '../src/serviceAccountKey.json' assert { type: "json" };

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const db = admin.firestore();
const adminAuth = admin.auth();

export { adminAuth }