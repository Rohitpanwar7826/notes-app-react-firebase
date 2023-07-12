import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/CurrentUserProvider";
import { onSnapshot, query, where } from "firebase/firestore";
import { notesCollection } from "../../firebase";

const useGetNotes = () => {
  const {currentUser, loading} = useContext(UserContext)
  const [notes, setNotes] = useState({loading: false, notes: []});

  useEffect(() => {
    let unsubscribe = () => {  }
    if (currentUser != null && !loading) {
      setNotes({...notes, loading: true})
      const q = query(notesCollection, where("user_id", "==", currentUser.uid));
        unsubscribe = onSnapshot(q, (snapshot) => {
        setNotes({loading: false, notes: snapshot.docs.map((doc) => {
          return {id: doc.id, ...doc.data()}
        })});
      });
    }
    return unsubscribe;
  }, [currentUser, loading])

  return notes
}

export default useGetNotes