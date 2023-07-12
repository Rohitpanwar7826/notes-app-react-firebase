import {  useState } from 'react'
import { sharedNotesCollection } from '../../../../firebase';
import { deleteDoc, getDocs, query, where } from 'firebase/firestore';

const useDestroyAssignUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const resetStatsDestroy = () => {
    setLoading(false);
    setError('')
    setMessage('')
  }

  const destroyRecords = async (selectedUserIds, noteId, setSubmitForm) => {
    try {
      setSubmitForm(true)
      setLoading(true)
      const q = query(
        sharedNotesCollection,
        where("noteId", "==", noteId),
        where("targetUserId", "in", selectedUserIds)
      );

      const records = await getDocs(q);

      records.forEach(async (doc) => {
        try {
          await deleteDoc(doc.ref);
          setLoading(false)
          setError('')
          setMessage('Successfully Un Assigned users from notes.')
        } catch (error) {
          setLoading(false)
          setError(error.message)
        }
      });

    } catch (error) {

      setLoading(false)
      setError(error.message)

    }
  }; 


  return ({
    loading,
    error,
    message,
    destroyRecords,
    resetStatsDestroy
  })
}

export default useDestroyAssignUsers