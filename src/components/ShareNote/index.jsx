import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loader from '../shared/Loader';
import { UserContext } from '../../context/CurrentUserProvider';
import getShareWithNotes from '../service/getShareWithNotes';
import './ShareNote.css';
import { isEmpty } from 'lodash';
import SubmitComponent from '../SubmitComponent';
import { toast } from 'react-toastify';

const initialState = {
  loading: false, users: []
}
const ShareNote = ({ showModal, setShowShare, selectedNoteId }) => {
  const { currentUser, loading } = useContext(UserContext);
  const [availableUsers, setAvailableUsers] = useState(initialState);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setAvailableUsers({ ...availableUsers, loading: true })
      const response = await getShareWithNotes(currentUser.uid, selectedNoteId)
      setAvailableUsers({ loading: false, users: response.filterUsers })
    }
    if (showModal) {
      getUsers()
    }
  }, [showModal])
  
  const handleModal = () => {
    setShowShare(false);
    setSubmitForm(false)
    setSelectedUserIds([])
    setAvailableUsers(initialState)
  };

  const findSelectedUserWithGiveKeyId = (key, id) => {
    return selectedUserIds.some(obj => obj[key] === id);
  }

  const handleSetUserIds = (type, selectedValue) => {
    if (findSelectedUserWithGiveKeyId('targetUserId', selectedValue)) {
      setSelectedUserIds(selectedUserIds.map((obj) => {
        if (obj.targetUserId === selectedValue) {
          if (type === 'targetUserId') return null;
          return ({
            ...obj,
            [type]: obj[type] ? false : true
          });

        }
        return obj;
      }).filter(obj => obj !== null))
    } else {
      setSelectedUserIds([...selectedUserIds, paramsForSelectedUserIds(false, false, currentUser.uid, selectedNoteId, selectedValue)])
    }
  }

  const paramsForSelectedUserIds = (canDelete, canEdit, currentUserId, noteId, targetUserId) => {
    return {
      canDelete,
      canEdit,
      currentUserId,
      noteId,
      targetUserId
    }
  }

  const handleFormSubmit = () => {
    if (isEmpty(selectedUserIds)) return (toast.error("PLEASE SELECT AT LEAST ONE USER.!"))
    setSubmitForm(true)
  }


  if (loading) return < Loader />
  return (
    <div>
      <Modal size='lg' show={showModal} onHide={handleModal}>
        <Modal.Header closeButton >
          < div className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <Modal.Title className='text-danger fs-6'>Share notes with Friends</Modal.Title>
            <Modal.Title className='text-secondary fs-5'>{selectedNoteId}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className='fs-5 container-fluid p-4'>
          <div className="container p-0 m-0">
            {
              submitForm ? < SubmitComponent selectedUserIdsWithAction={selectedUserIds} submitForm={submitForm} /> :
                (<div className="row">
                  <div className="col-12 col-sm-12 col-lg-12 text-center table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Select Users</th>
                          <th scope="col">User Email</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          availableUsers.loading ? <tr><td colSpan="100%">< Loader /></td></tr> :
                            availableUsers.users.map(user => (
                              <React.Fragment key={user.id}>
                                <tr key={user.id}>
                                  <td>
                                    < input type="checkbox" className="custom-control-input" id="edit"
                                      onChange={() => {
                                        handleSetUserIds('targetUserId', user.id)
                                      }}
                                    />
                                  </td>
                                  <td className='text-wrap'>{user.email}</td>
                                  <td>
                                    <input type="checkbox" className="custom-control-input" id="edit"
                                      onChange={() => {
                                        handleSetUserIds('canEdit', user.id)
                                      }}
                                      checked={selectedUserIds.some(obj => obj['targetUserId'] === user.id && obj['canEdit'] === true)}
                                      disabled={!selectedUserIds.some(obj => obj['targetUserId'] === user.id)}
                                    />
                                  </td>
                                  <td>
                                    <input type="checkbox" className="custom-control-input" id="delete" onChange={() => {
                                      handleSetUserIds('canDelete', user.id)
                                    }}
                                      checked={selectedUserIds.some(obj => obj['targetUserId'] === user.id && obj['canDelete'] === true)}
                                      disabled={!selectedUserIds.some(obj => obj['targetUserId'] === user.id)}
                                    />
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>)
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          {
            !submitForm ? (<Button variant="primary" onClick={handleFormSubmit} disabled={isEmpty(selectedUserIds)}>
              Share Now
            </Button>) : null
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ShareNote.propTypes = {
  showModal: PropTypes.bool,
  setShowShare: PropTypes.func,
  selectedNoteId: PropTypes.string
}

export default ShareNote;
