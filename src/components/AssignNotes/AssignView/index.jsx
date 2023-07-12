import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../context/CurrentUserProvider";
import Loader from "../../shared/Loader";
import useGetNoteById from "./hooks/useGetNoteById";
import Alert from "../../shared/Alert";
import "./index.css";
import Note from "../../MyNotes/ViewNote/Note";

const AssignView = () => {
  const { currentUser } = useContext(UserContext);
  const { uid: currentUserId } = currentUser;
  const { assign_note_id: assignNoteId } = useParams();
  const { data, loading, error } = useGetNoteById({
    currentUserId,
    noteId: assignNoteId,
  });

  if (loading) return <Loader />;

  if (error) return <Alert msg={error.message} />;
  return (
    < Note note={data.record} noteId={assignNoteId} showHowManyFriendsAreShare={false} />
  );
};

export default AssignView;
