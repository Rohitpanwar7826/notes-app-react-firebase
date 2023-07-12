import { useEffect, useState } from 'react'
import { allowUserToSharedCollection } from '../../../firebase';
import { onSnapshot, query, where } from 'firebase/firestore';

const initialState = {
  sharedNoteRecord: {
    user_id: null,
    email: null,
    is_allow: false
  }, loading: false
}

const useFindEnableUserToShareNotes = (current_user_id) => {
  const [sharedNoteRecord, setsharedNoteRecord] = useState(
    {
      loading: false,
      sharedNoteRecord: null
    }
  );

  useEffect(() => {
    let snapObj = null;
    try {
      setsharedNoteRecord({ ...sharedNoteRecord, loading: true })
      const q = query(allowUserToSharedCollection, where("user_id", "==", current_user_id));
      snapObj = onSnapshot(q, (snapshot) => {
        snapshot.forEach((recordDoc) => {
          setsharedNoteRecord({ sharedNoteRecord: recordDoc.data(), loading: false })
          return
        })
        if (snapshot.empty) {
          setsharedNoteRecord(initialState)
        }
      });
    } catch (error) {
      setsharedNoteRecord(initialState)
    }
    return snapObj
  }, [current_user_id])

  return sharedNoteRecord
}

export default useFindEnableUserToShareNotes