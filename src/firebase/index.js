
import { initializeApp } from "firebase/app";
import { collection, documentId, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { doc } from "firebase/firestore";

const TABLE_RK_NOTES = 'r-k-notes'
const TABLE_ALLOW_USERS_TO_SHARED = 'allow-users-to-shared'
const TABLE_SHARED_NOTES = 'shared-notes'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_DOMAIN_FOR_FIREBASE,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_BUCKET_NAME,
  messagingSenderId: import.meta.env.VITE_M_S_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const notesCollection = collection(db, TABLE_RK_NOTES)
const rKNotesRef = doc(notesCollection);
const allowUserToSharedDocRef = doc(collection(db, TABLE_ALLOW_USERS_TO_SHARED));
const allowUserToSharedCollection = collection(db, TABLE_ALLOW_USERS_TO_SHARED);
const sharedNotesCollection = collection(db, TABLE_SHARED_NOTES);
const sharedNotesRef = () => (doc(collection(db, TABLE_SHARED_NOTES)));
const tableAllowUsersToShared = TABLE_ALLOW_USERS_TO_SHARED;
const tableRKNotes = TABLE_RK_NOTES;
const tableSharedNotes = TABLE_SHARED_NOTES
const newRef = () => {
  return doc(collection(db, TABLE_RK_NOTES))
}

const deleteDocRef = (id) => {
  return doc(db, TABLE_RK_NOTES, id)
}

const deleteShareNoteRef = (id) => {
  return doc(db, TABLE_SHARED_NOTES, id)
}

async function findUserInAllowUsers(userId) {
  const q = query(collection(db, TABLE_ALLOW_USERS_TO_SHARED), where("user_id", "==", userId));
  return await getDocs(q);
}

function findUserByUserIdAndNoteIdQuery(userId, noteId) {
  return query(sharedNotesCollection,
    where("targetUserId", "==", userId),
    where("noteId", "==", noteId),
    limit(1)
  )
}

const findNoteQuery = (targetNoteId) => {
  return query(
    notesCollection,
    where(documentId(), "==", targetNoteId, limit(1))
  );
}

export {
  auth,
  googleProvider,
  db,
  rKNotesRef,
  notesCollection,
  newRef,
  deleteDocRef,
  app,
  findUserInAllowUsers,
  allowUserToSharedDocRef,
  tableAllowUsersToShared,
  allowUserToSharedCollection,
  sharedNotesRef,
  sharedNotesCollection,
  tableRKNotes,
  findUserByUserIdAndNoteIdQuery,
  findNoteQuery,
  deleteShareNoteRef,
  tableSharedNotes
}