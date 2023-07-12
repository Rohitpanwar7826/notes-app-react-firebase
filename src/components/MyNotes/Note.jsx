import { useState } from "react";
import ShareNote from "../ShareNote";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Note({ note, handleDeleteNote }) {
  const [showShare, setShowShare] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  return (
    <>
      <ShareNote
        showModal={showShare}
        setShowShare={setShowShare}
        selectedNoteId={selectedNoteId}
      />
<div className="card my-3">
  <div className="card-header">{note.id}</div>
  <div className="card-body">
    <h5 className="card-title">
      {note.title.length >= 25 ? note.title.substring(0, 25) + "..." : note.title}
    </h5>
    <p className="card-text">
      {note.body.length >= 35 ? note.body.substring(0, 35) + "..." : note.body}.
    </p>
    <div className="d-flex flex-wrap justify-content-center">
      <Link
        to={`/my-notes/${note.id}/view`}
        className="btn btn-primary mx-2 mt-2 mt-sm-0"
      >
        Real Time View
      </Link>
      <Link
        to={`/my-notes/${note.id}/edit`}
        className="btn btn-secondary mx-2 mt-2 mt-sm-0"
      >
        Edit
      </Link>
      <button
        className="btn btn-danger mx-2 mt-2 mt-sm-0"
        onClick={() => {
          handleDeleteNote(note.id);
        }}
      >
        DELETE
      </button>
      <button
        className="btn btn-info mx-2 mt-2 mt-sm-0"
        onClick={() => {
          setShowShare(true);
          setSelectedNoteId(note.id);
        }}
      >
        Share
      </button>
    </div>
  </div>
</div>

    </>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  handleDeleteNote: PropTypes.func.isRequired,
};

export default Note;
