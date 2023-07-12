import ResponseBuilder from "./ResponseBuilder";
import { sharedNotesCollection } from '../../firebase'
import { addDoc, getDocs, query, where } from 'firebase/firestore'

// selectedUsersIdsWithActions first record attrs
//   canDelete,
//   canEdit,
//   currentUserId,
//   noteId,
//   targetUserId

const createSharedNoteRecord = async (selectedUsersIdsWithActions) => {
  try {
     await Promise.all(selectedUsersIdsWithActions.map(async (node) => {
     const alreadyExitsNoteUser = query(sharedNotesCollection, 
        where("currentUserId", "==", node.currentUserId),
        where("targetUserId", "==", node.targetUserId),
        where("noteId", "==", node.noteId)
      )
      const alreadyExitsNoteUserSnapShot = await getDocs(alreadyExitsNoteUser);

      if (alreadyExitsNoteUserSnapShot.empty) {
        await addDoc(sharedNotesCollection, node)
      }
    }));
    return ResponseBuilder(true, null, selectedUsersIdsWithActions.length)
  } catch(error) {
   return ResponseBuilder(false, error.message, null)
  }
}

export default createSharedNoteRecord