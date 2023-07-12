import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import useGetUserNotesCount from '../MyNotes/hooks/useGetUserNotesCount'
const NewNote = ({ noteObj, handleNoteChange, loading, type, addNote }) => {
  const notesCount = useGetUserNotesCount();
  return (
    <Container className="container-fluid">
      <Row className="m-0 p-0 mt-4">
        <Col md={12}>
          <Card className="w-100">
            <Card.Header className="text-center">
               Total Notes - <span className="text-danger">{notesCount}</span>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="noteForm">
                  <Form.Control
                    rows={21}
                    placeholder="Enter a title.."
                    name="title"
                    value={noteObj.title}
                    onChange={handleNoteChange}
                    className="p-2 my-2"
                  />
                  <Form.Control
                    as="textarea"
                    rows={21}
                    placeholder="Enter a note..."
                    name="body"
                    value={noteObj.body}
                    onChange={handleNoteChange}
                  />
                </Form.Group>
                {type === "new" ? (
                  <Button
                    variant="primary"
                    className="my-2"
                    onClick={addNote}
                    disabled={loading}
                  >
                    {loading ? "LOADING..." : "Add Note"}
                  </Button>
                ) : null}
              </Form>
              <hr />
              {/* {notes.map((note, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>{note.title}</div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteNote(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))} */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewNote;
