import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { toast } from "react-toastify";
import "./index.css";
import { useState } from "react";
import Loader from '../shared/Loader';

const SignInOptions = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    await signInWithPopup(auth, googleProvider)
      .then((user) => {
        toast.success(`Hi, ${user?.user?.displayName}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="google-login d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1>Google Login</h1>
        {loading ? (
          <Loader />
        ) : (
          <button className="btn btn-primary" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInOptions;
