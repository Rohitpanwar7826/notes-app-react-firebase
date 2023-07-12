import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

const UserContext = createContext();

const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        const currentUserData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          uid: user.uid
        }
        setCurrentUser(currentUserData);
      }else{
        setCurrentUser(user?.auth);
      }
    })
  }, [])
  const loading = currentUser === null ? true : false;
  return <UserContext.Provider value={{currentUser, loading}} {...props} />
}

export default CurrentUserProvider;
export {
  UserContext
}