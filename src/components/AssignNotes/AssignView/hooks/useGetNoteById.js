import { getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { findNoteQuery, findUserByUserIdAndNoteIdQuery } from "../../../../firebase";

const initialStateOfData = { recordPresent: false, record: null };

const useGetNoteById = ({ currentUserId, noteId }) => {
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [data, setData] = useState(initialStateOfData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNoteById = async () => {
      try {
        const query = findUserByUserIdAndNoteIdQuery(currentUserId, noteId);
        const snapObj = await getDocs(query)
        if (!snapObj.empty) {
          const targetNoteId = snapObj.docs[0].data().noteId;
          onSnapshot(findNoteQuery(targetNoteId), (nodes) => {
            const note = { ...nodes.docs[0]?.data(), id: nodes.docs[0]?.id };
            if (nodes.docs[0]) {
              setData({
                recordPresent: true,
                record: note
              });
              setLoading(false);
            } else {
              setData({
                recordPresent: false,
                record: null
              });
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
          setData({
            recordPresent: false,
            record: null
          });
        }
      } catch (error) {
        setError(error);
        setData(initialStateOfData);
        setLoading(false);
      }
    }
    getNoteById();
  }, [currentUserId, noteId]);

  return {
    loading,
    error,
    data
  };
};

export default useGetNoteById;
