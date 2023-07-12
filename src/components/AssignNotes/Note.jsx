import EmptyCard from "../shared/EmptyCard";
import { Button } from "react-bootstrap";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Fragment, useContext } from "react";
import "./index.css";
import {
  loadingToaster,
  updateToasterToError,
  updateToasterToSuccess,
} from "../toaster/index.";
import { db, tableSharedNotes } from "../../firebase";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../context/CurrentUserProvider";

const Note = ({ data }) => {
  const { currentUser } = useContext(UserContext);

  const handleDeleteNote = (noteId) => {
    let canDelete = confirm("Are you sure to delete this note");
    const deleteNote = async () => {
      const toasterId = loadingToaster("Please wait Note Deleting...");
      try {
        const sharedNoteRef = collection(db, tableSharedNotes);
        const q = query(
          sharedNoteRef,
          where("noteId", "==", noteId),
          where("targetUserId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          try {
            await deleteDoc(doc.ref);
          } catch (error) {
            console.error("Error recovering deleted record:", error);
          }
        });
        updateToasterToSuccess(toasterId, "Note Deleted successfully");
      } catch (error) {
        updateToasterToError(toasterId, error.message);
      }
    };
    if (canDelete) deleteNote();
  };

  return (
    <>
      {!isEmpty(data) ? (
        <ol className="list-group list-group-numbered">
          {data?.map((note) => (
            <Fragment key={note.id}>
              <li
                className="list-group-item d-flex justify-content-between align-items-start my-2 p-2"
                key={note.id}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <p>{note.title}</p>
                  </div>
                  <div>
                    <pre className="p-1 note-body">
                      {note.body.length >= 100
                        ? note.body.substring(0, 160) + "..."
                        : note.body}
                    </pre>
                  </div>
                </div>
              </li>
              <div className="d-flex p-2 ">
                <Link to={`${note.id}/view`} className="btn btn-primary mx-2">
                  Real Time View
                </Link>

                {note.canEdit ? (
                  <Link
                    to={`${note.id}/edit`}
                    className="btn btn-secondary mx-2"
                  >
                    Edit
                  </Link>
                ) : null}

                {note.canDelete ? (
                  <Button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </Button>
                ) : null}
              </div>
            </Fragment>
          ))}
        </ol>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

Note.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.string,
};

export default Note;
