import { doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db, findUserByUserIdAndNoteIdQuery, tableRKNotes } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useGetEditNote = ({ noteId, currentUserId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const setNoteData = (newData) => {
    setData(newData)
  }

  const getNoteById = async (noteId, currentUserId) => {
    try {
      const query = findUserByUserIdAndNoteIdQuery(currentUserId, noteId);
      const DocsData = await getDocs(query)
      if(DocsData.empty) {
        setLoading(false);
        navigate("/assign-notes")
        toast.error('Note not Found for given ID')
        return
      }
      
      const DocData = DocsData.docs[0].data();
      if(!DocData.canEdit) {
        setLoading(false);
        navigate("/assign-notes")
        toast.error("You don't have permission to perform this action.!")        
        return
      }

      const docNoteRef = doc(db, tableRKNotes, DocData.noteId)
      const note = await getDoc(docNoteRef)
      if(note.exists()) {
        setData({id: note.id, ...note.data()})
      }else {
        navigate("/assign-notes")
        toast.error("Note not found for given id.")        
      }
      
      setLoading(false);
    }catch(error){
      setLoading(false);
      setError(error.message)
      setData(null)
    }
  }

  useEffect(() => {
    getNoteById(noteId, currentUserId)
  }, [noteId, currentUserId])

  return ({
    loading,
    error,
    data,
    setNoteData
  })
}

export default useGetEditNote