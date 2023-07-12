import React, { useEffect, useState } from "react";
import {
  allowUserToSharedCollection,
  sharedNotesCollection,
} from "../../../../firebase";
import { getDocs, query, where } from "firebase/firestore";
import { isEmpty } from "lodash";

const useGetAssignNoteUsers = ({ showModal, noteId, currentUserId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const resetStatsAssign = () => {
    setLoading(false);
    setData(null);
    setError("")
  }

  const getNoteAssignUsers = async () => {
    try {
      setLoading(true)
      const assignUsersQuery = query(
        sharedNotesCollection,
        where("noteId", "==", noteId),
        where("currentUserId", "==", currentUserId)
      );

      const assignUsers = await getDocs(assignUsersQuery);

      const assignUsersIds = assignUsers.docs.map(
        (record) => record.data().targetUserId
      );
      
      if(isEmpty(assignUsersIds)) {
        setLoading(false);
        setError('');
        setData([]);
      }else {
        
        const usersQuery = query(
          allowUserToSharedCollection,
          where("user_id", "in", assignUsersIds)
        );
  
        const users = (await getDocs(usersQuery)).docs;
  
        const usersData = users.map((record) => {
          return { userId: record.data().user_id, 
                    email: record.data().email 
                };
        });
        
        setLoading(false);
        setError('');
        setData(usersData);
      }
    } catch (error) {
      setError(error.message);
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal) getNoteAssignUsers();
  }, [showModal]);
  return {
    loading,
    data,
    error,
    resetStatsAssign
  };
};

export default useGetAssignNoteUsers;
