import { useContext, useState } from "react";
import { UserContext } from "../../context/CurrentUserProvider";
import { setDoc } from "firebase/firestore";
import Loader from "../shared/Loader";
import { newRef } from "../../firebase";
import { toast } from "react-toastify";
import { updateToasterToError } from "../toaster/index.";
import NewNote from "./NewNote";
const initialNotesState = {
  title: "",
  body: "",
};
const NewNotes = () => {
  const { currentUser, loading } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(initialNotesState);
  const [firebaseLoading, setfirebaseLoading] = useState(false);
  const handleNoteChange = (event) => {
    setNewNote({ ...newNote, [event.target.name]: event.target.value });
  };

  const addNote = async () => {
    if (newNote.title.trim() !== "" && newNote.body.trim() !== "") {
      let toasterId = null;
      try {
        toasterId = toast.loading("Please wait...", { theme: "dark" });
        setfirebaseLoading(true);
        const rKNotesRef = newRef();
        await setDoc(
          rKNotesRef,
          {
            title: newNote.title,
            body: newNote.body,
            user_id: currentUser.uid,
          },
          {
            merge: true,
          }
        ).then(() => {
          setNewNote(initialNotesState);
          setNotes([...notes, { title: newNote.title, body: newNote.body }]);
          setfirebaseLoading(false);
          toast.update(toasterId, {
            render: "Note added successful",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
        });
      } catch (error) {
        updateToasterToError(toasterId, error.message);
      }
    }
  };

  if (loading) return <Loader />;
  return (
    <NewNote
      loading={firebaseLoading}
      handleNoteChange={handleNoteChange}
      noteObj={newNote}
      addNote={addNote}
      type={'new'}
    />
  );
};

export default NewNotes;
