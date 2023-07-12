import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/CurrentUserProvider'
import Loader from '../shared/Loader';
import { useNavigate } from 'react-router-dom';

const PrivateSection = (props) => {
  const navigate = useNavigate();
  const {currentUser, loading} = useContext(UserContext);

  useEffect(() => {
    if (!loading && currentUser === undefined) {
      navigate('/sign-in')
    }
  }, [currentUser])

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  if (loading) return <Loader />


  return currentUser !== undefined ? props.Comp : null;
}

export default PrivateSection