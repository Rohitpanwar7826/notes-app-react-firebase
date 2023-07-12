import { useContext, useEffect } from "react";
import { UserContext } from "../../context/CurrentUserProvider";
import Loader from "../shared/Loader";
import Heading from "../shared/Heading";
import Note from "./Note";
import useGetAssignNotes from "./hooks/useGetAssignNotes";
import { Alert } from "react-bootstrap";

const AssignNotes = () => {
  const { currentUser } = useContext(UserContext);
  const { uid: currentUserId } = currentUser;
  const { data, loading, error, unScribe } = useGetAssignNotes({ currentUserId });

  const unScribeNotes = (unScribes) => {
    unScribes?.forEach(funUnscribe => {
      funUnscribe ? funUnscribe() : null
    });
  }

  useEffect(() => {
    return () => {
      unScribeNotes(unScribe)
    }
  }, [])

  if(loading) return < Loader />

  if(error) return(< Alert variant="danger"> {error} </Alert>)

  return (
    <>
      <Heading title="Assign Notes" />
      {
        data ? <Note data={data} error={error}/> : null
      }
    </>
  );
};

export default AssignNotes;
