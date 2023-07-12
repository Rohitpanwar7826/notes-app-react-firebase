import { useContext, useEffect } from "react"
import { UserContext } from "../../context/CurrentUserProvider"
import Loader from "../shared/Loader";
import { useNavigate } from "react-router-dom";

const PublicSection = (props) => {
  
  const navigation = useNavigate();
  
  const { currentUser, loading } = useContext(UserContext);
  
  useEffect(() => {
    if(!loading && currentUser !== undefined) navigation(-1)
  }, [currentUser])

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  if (loading) return <Loader />

  return (currentUser == null ? <props.Comp /> : null)
}

export default PublicSection