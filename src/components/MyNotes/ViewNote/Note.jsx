import { Row, Col, Card, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import HowManyFriendsAssign from "../HowManyFriendsAssign";

const Note = ({ note, noteId, showHowManyFriendsAreShare }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HowManyFriendsAssign showModal={showModal} setShowModal={setShowModal} selectedNoteId={noteId} />

      <Row className="m-0 p-0 mt-5 p-2" lg={12}>
        <Col lg={12} md={12}>
          <Card className="w-100">
            <Card.Header className="text-center">{noteId}</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="noteForm">
                  <Form.Control
                    rows={21}
                    placeholder="Enter a title.."
                    name="title"
                    value={note.title}
                    onChange={() => {}}
                    className="p-2 my-2"
                    disabled={true}
                  />
                  <Form.Control
                    as="textarea"
                    rows={25}
                    placeholder="Enter a note..."
                    name="body"
                    value={note.body}
                    onChange={() => {}}
                    disabled={true}
                  />
                </Form.Group>
              </Form>
              <hr className="text-danger p-2" />
              {showHowManyFriendsAreShare ? (
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary w-25 text-center align-items-center"
                    onClick={() => setShowModal(true)}
                  >
                    How many friends are assign
                  </button>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Note.defaultProps = {
  showHowManyFriendsAreShare: false,
};

Note.propTypes = {
  noteId: PropTypes.string.isRequired,
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  showHowManyFriendsAreShare: PropTypes.bool,
};

export default Note;
