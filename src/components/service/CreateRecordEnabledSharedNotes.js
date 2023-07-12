import { setDoc } from "firebase/firestore";
import { allowUserToSharedDocRef } from "../../firebase";
import ResponseBuilder from "./ResponseBuilder";

const CreateRecordEnabledSharedNotes = async (current_user_id, email) => {
  try {
    await setDoc(
      allowUserToSharedDocRef,
      {
        is_allow: true,
        email: email,
        user_id: current_user_id,
      },
      {
        merge: true,
      }
    )
    return ResponseBuilder(true, null, null)
  } catch (error) {
    return ResponseBuilder(false, error.message, error.message)
  }
}

export default CreateRecordEnabledSharedNotes