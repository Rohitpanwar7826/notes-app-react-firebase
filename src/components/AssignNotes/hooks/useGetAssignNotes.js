import { useEffect, useState } from "react";
import { documentId, onSnapshot, query, where } from "firebase/firestore";
import { notesCollection, sharedNotesCollection } from "../../../firebase";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

const useGetAssignNotes = ({ currentUserId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [unScribe, setUnScribe] = useState([]);

  const getAssignNotes = () => {
    try {
      const sharedNotesQuery = query(sharedNotesCollection, where("targetUserId", "==", currentUserId))
      const channelSharedNotes = onSnapshot(sharedNotesQuery, (SnapSharedNoteData) => {
        const sharedNotesIds = SnapSharedNoteData.docs.map((sharedNoted) => sharedNoted.data().noteId)
        if (isEmpty(sharedNotesIds)) {
          setData(new Array)
          setLoading(false);
        } else {
          setLoading(true);
          const NotesQuery = query(notesCollection, where(documentId(), "in", sharedNotesIds))
          const channelNotes = onSnapshot(NotesQuery, (notes) => {
            const newData = notes.docs.map((note) => {
              const sharedNote = SnapSharedNoteData.docs.find(obj => obj.data().noteId === note.id).data();
              return {
                id: note.id,
                ...note.data(),
                canEdit: sharedNote ? sharedNote.canEdit : false,
                canDelete: sharedNote ? sharedNote.canDelete : false
              }
            })
            setData(newData)
            setLoading(false)
          })
          setUnScribe([...unScribe, channelNotes])
        }
      })
      
      setUnScribe([...unScribe, channelSharedNotes])
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      setError(error.message)
      setData(null)
    }
  }

  useEffect(() => {
    getAssignNotes()
  }, [])


  return ({
    loading,
    error,
    data,
    unScribe
  })
}

export default useGetAssignNotes