import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Loader from "../../shared/Loader";
import useGetAssignNoteUsers from "./hooks/useGetAssignNoteUsers";
import { UserContext } from "../../../context/CurrentUserProvider";
import { isEmpty } from "lodash";
import useDestroyAssignUsers from "./hooks/useDestroyAssignUsers";
import EmptyCard from "../../shared/EmptyCard";

const HowManyFriendsAssign = ({ showModal, setShowModal, selectedNoteId }) => {
  const { currentUser } = useContext(UserContext);

  const [submitForm, setSubmitForm] = useState(false);

  const [selectedIds, setSelectedIds] = useState(new Array());

  const { loading, error, data, resetStatsAssign } = useGetAssignNoteUsers({
    showModal,
    noteId: selectedNoteId,
    currentUserId: currentUser?.uid,
  });

  const {
    loading: submitLoading,
    error: submitError,
    message: submitMessage,
    destroyRecords,
    resetStatsDestroy,
  } = useDestroyAssignUsers();

  useEffect(() => {
    if (!showModal) {
      setSelectedIds(new Array());
      setSubmitForm(false);
    }
  }, [showModal]);

  const handleSelectedUserIds = (selectedId) => {
    if (selectedIds.includes(selectedId)) {
      setSelectedIds(selectedIds.filter((id) => id !== selectedId));
      return;
    }
    setSelectedIds([...selectedIds, selectedId]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    destroyRecords(selectedIds, selectedNoteId, setSubmitForm);
  };

  return (
    <div>
      <Modal size="lg" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <Modal.Title className="text-danger fs-6">
              How Many Friends Are Assign
            </Modal.Title>
            <Modal.Title className="text-secondary fs-5">
              {selectedNoteId}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="fs-5 container-fluid p-4">
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : submitForm ? (
            submitLoading ? (
              <Loader />
            ) : (
              <>
                {submitError ? (
                  <Alert variant="danger"> {submitError} </Alert>
                ) : null}
                {submitMessage ? (
                  <Alert variant="success"> {submitMessage} </Alert>
                ) : null}
              </>
            )
          ) : (
            <div className="container p-0 m-0">
              {
                <div className="row">
                  <div className="col-12 col-sm-12 col-lg-12 text-center table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Select Users</th>
                          <th scope="col">User Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="100%">
                              <Loader />
                            </td>
                          </tr>
                        ) : (
                          data.map((record) => (
                            <React.Fragment key={record.userId}>
                              <tr key={record.userId}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="edit"
                                    onChange={() => {
                                      handleSelectedUserIds(record.userId);
                                    }}
                                  />
                                </td>
                                <td className="text-wrap">{record.email}</td>
                              </tr>
                            </React.Fragment>
                          ))
                        )}
                      </tbody>
                    </table>
                        { !loading && isEmpty(data) ? < EmptyCard /> :  null }
                  </div>
                </div>
              }
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={isEmpty(selectedIds) || submitLoading || loading}
            onClick={handleSubmit}
          >
            Remove User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HowManyFriendsAssign;
