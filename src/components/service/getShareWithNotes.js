import { allowUserToSharedCollection, sharedNotesCollection } from '../../firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

const getShareWithNotes = async (currentUserId, noteId) => {
  let users = new Array;
  const usersSharedNotesTargetIds = new Array;
  try {
    const queryAllowedUsers = query(allowUserToSharedCollection, where("is_allow", "==", true));

    const allowUsersData = await getDocs(queryAllowedUsers);
    allowUsersData.forEach((recordDoc) => {
      const recordData = recordDoc.data();
  
      currentUserId !== recordData.user_id ? users.push({id: recordData.user_id, email: recordData.email}) : null
    });
    const userIds = users.map((user) => user.id)
    const querySharedUsers = query(
      sharedNotesCollection,
      where("targetUserId", "in", userIds),
      where("noteId", "==", noteId)
    );
    
    const sharedNotesData = await getDocs(querySharedUsers);
    sharedNotesData.forEach((recordDoc) => {
      const recordData = recordDoc.data();
      
      currentUserId !== recordData.targetUserId ? usersSharedNotesTargetIds.push(recordData.targetUserId) : null
    });
    
    
    users = users.filter(user => !usersSharedNotesTargetIds.includes(user.id))
    return { status: true, error: '', filterUsers: users, loading: false}
  } catch(error) {
    toast.error(error.message)
    console.error(error)
    return {status: false, error: error.message, filterUsers: [], loading: false}
  }
}

export default getShareWithNotes