import { documentId, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notesCollection } from "../../../firebase";
import { UserContext } from "../../../context/CurrentUserProvider";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import Note from "./Note";

const ViewNote = () => {
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
            where(documentId(), "==", noteId)
          );
          const unScribe = onSnapshot(noteQuery, (nodes) => {
            const note = { ...nodes.docs[0]?.data(), id: nodes.docs[0].id };
            if (nodes.docs[0]) {
              setNote({
                ...note,
                status: true,
                error: "",
                result: note,
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
          });
          return unScribe;
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

  if (note.loading) return <Loader />;

  return note.status ? (
    < Note note={note.result} noteId={noteId} showHowManyFriendsAreShare />
  ) : (
    <h3 className="text-center bg-info">{note.error}</h3>
  );
};

export default ViewNote;
