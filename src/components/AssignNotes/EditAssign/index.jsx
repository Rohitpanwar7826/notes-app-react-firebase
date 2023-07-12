import { useParams } from "react-router-dom"
import useGetEditNote from "./hooks/useGetEditNote";
import Loader from "../../shared/Loader";
import { Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../../context/CurrentUserProvider";
import NewNote from "../../NewNotes/NewNote";
import { doc, updateDoc } from "firebase/firestore";
import { db, tableRKNotes } from "../../../firebase";

const EditAssign = () => {
  const { currentUser } = useContext(UserContext)

  const { assign_note_id: noteId } = useParams();

  const { loading, error, data, setNoteData } = useGetEditNote({ noteId, currentUserId: currentUser.uid})
  
  if(loading) return < Loader />
  
  if(error) return < Alert variant="danger" >{error}</Alert>
  
  const handleNoteChange = async (event) => {
    setNoteData({...data, [event.target.name]: event.target.value})
    const rkNoteRef = doc(db, tableRKNotes, noteId);
    await updateDoc(rkNoteRef, { [event.target.name]: event.target.value });
  };

  return (
    < NewNote noteObj={data} handleNoteChange={handleNoteChange}/>
  )
}

export default EditAssign