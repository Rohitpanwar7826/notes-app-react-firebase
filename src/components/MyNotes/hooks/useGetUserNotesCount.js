import { useContext, useEffect, useState } from 'react'
import { notesCollection } from '../../../firebase'
import { UserContext } from '../../../context/CurrentUserProvider'
import {  onSnapshot, query, where } from 'firebase/firestore';

const useGetUserNotesCount = () => {
  const { currentUser, loading } = useContext(UserContext);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    let unsubscribe = null;
    if (currentUser != null && !loading) {
      const q = query(notesCollection, where("user_id", "==", currentUser.uid));
      unsubscribe = onSnapshot(q, (snapshot) => {
        setNotesCount(snapshot.size);
      });
      return unsubscribe;
    }
    return unsubscribe()
  }, [currentUser, loading])
  return (
    notesCount
  )
}

export default useGetUserNotesCount