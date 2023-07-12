import {
  doc,
  documentId,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, notesCollection, tableRKNotes } from "../../../firebase";
import { UserContext } from "../../../context/CurrentUserProvider";
import { toast } from "react-toastify";
import NewNote from "../../NewNotes/NewNote";
import Loader from "../../shared/Loader";

const EditNote = () => {
  const { currentUser } = useContext(UserContext);
  const { note_id: noteId } = useParams();
  const [note, setNote] = useState({
    status: false,
    error: "",
    loading: false,
    result: { title: "", body: "", user_id: "" },
  });

  useEffect(() => {
    const getNoteById = async () => {
      if (currentUser) {
        try {
          setNote({ ...note, loading: true });
          const noteQuery = query(
            notesCollection,
            where("user_id", "==", currentUser.uid),
            where(documentId(), "==", noteId),
            limit(1)
          );
          const nodes = await getDocs(noteQuery);
          const noteData = { ...nodes.docs[0]?.data(), id: nodes.docs[0]?.id };
          if (!nodes.empty) {
            setNote({
              ...note,
              status: true,
              error: "",
              result: noteData,
              loading: false,
            });
          } else {
            toast.error("Record not found..!");
            setNote({
              ...note,
              status: false,
              error: "Record not found",
              loading: false,
            });
          }
        } catch (error) {
          setNote({
            ...note,
            status: false,
            error: error.message,
            loading: false,
          });
          toast.error(error.message);
        }
      }
    };
    getNoteById();
  }, [noteId, currentUser]);

  const updateNote = async (note) => {
    const rkNoteRef = doc(db, tableRKNotes, noteId);
    await updateDoc(rkNoteRef, note);
  };

  const handleNoteChange = async (event) => {
    const updatedNote = {
      ...note,
      result: { ...note.result, [event.target.name]: event.target.value },
    };
    setNote(updatedNote);
    await updateNote({ [event.target.name]: event.target.value });
  };

  if (note.loading) return <Loader />;

  return note.status ? (
    <>
      <NewNote noteObj={note.result} handleNoteChange={handleNoteChange} />
    </>
  ) : (
    <h3 className="text-center bg-info">{note.error}</h3>
  );
};

export default EditNote;
