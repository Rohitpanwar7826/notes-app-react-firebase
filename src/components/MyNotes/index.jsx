import Heading from '../shared/Heading'
import useGetNotes from '../PrivateSection/useGetNotes'
import Note from './Note';
import Loader from '../shared/Loader'
import { deleteDocRef } from '../../firebase';
import { deleteDoc } from 'firebase/firestore';
import { loadingToaster, updateToasterToError, updateToasterToSuccess } from '../toaster/index.';

const MyNotes = () => {
  const { loading, notes } = useGetNotes();
  const handleDeleteNote = (noteId) => {
    let canDelete = confirm("Are you sure to delete this note");
    const deleteNote = async () => {
      const toasterId = loadingToaster("Please wait Note Deleting...");
      try {
        await deleteDoc(deleteDocRef(noteId)).then(() => {
          updateToasterToSuccess(toasterId, "Note Deleted successfully")
        })
      } catch (error) {
        updateToasterToError(toasterId, error.message)
      }
    }
    if (canDelete) deleteNote()
  }

    return (
      <>
        <Heading title="My Notes" />
        {
          loading ? < Loader /> : <div className="p-4">
            {
              notes.map((note) => <Note note={note} key={note.id} handleDeleteNote={handleDeleteNote} />)
            }
          </div>
        }
      </>
    )
}

export default MyNotes