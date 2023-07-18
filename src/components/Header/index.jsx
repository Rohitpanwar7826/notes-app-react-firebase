import { useContext } from "react";
import "./Header.css";
import { UserContext } from "../../context/CurrentUserProvider";
import Loader from "../shared/Loader";
import { signOut } from "firebase/auth";
import {
  allowUserToSharedCollection,
  auth,
  findUserInAllowUsers,
} from "../../firebase";
import { loadingToaster } from "../toaster/index.";
import { updateToasterToSuccess } from "../toaster/index.";
import { updateToasterToError } from "../toaster/index.";
import useFindEnableUserToShareNotes from "./hooks/useFindEnableUserToShareNotes";
import CreateRecordEnabledSharedNotes from "../service/CreateRecordEnabledSharedNotes";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser, loading } = useContext(UserContext);
  const sharedNoteRecord = useFindEnableUserToShareNotes(
    currentUser?.uid || "0"
  );
  if (loading) return <Loader />;
  const signOutUser = async () => {
    const toasterId = loadingToaster("Sign-out Please wait");
    await signOut(auth)
      .then(() => {
        updateToasterToSuccess(toasterId, "Sign-out Successfully.");
      })
      .catch((error) => {
        updateToasterToError(toasterId, error.message);
      });
  };

  const handleEnableShareNotes = async () => {
    let toastId = null;
    try {
      toastId = loadingToaster("Please wait...");
      const data = await findUserInAllowUsers(currentUser.uid);
      if (data.empty) {
        const response = await CreateRecordEnabledSharedNotes(
          currentUser.uid,
          currentUser.email
        );
        response.success
          ? updateToasterToSuccess(toastId, "Now any one share with you notes")
          : updateToasterToError(toastId, response.error);
      } else {
        let record = null;
        data.forEach((recordDoc) => {
          const docRef = doc(allowUserToSharedCollection, recordDoc.id);
          record = recordDoc.data();
          updateDoc(docRef, { is_allow: !record.is_allow });
        });
        const msg = !record.is_allow
          ? "Now any one share with you notes"
          : "Notes Sharing blocked";
        updateToasterToSuccess(toastId, msg);
      }
    } catch (error) {
      updateToasterToError(toastId, error.message);
    }
  };

  if (!currentUser) return null;

  return (
    <div style={{ marginBottom: "5rem" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top p-1">
        <div className="container">
          <Link to="/" className="navbar-brand">
            R-K NOTES
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item m-auto">
                <Link to="/my-notes" className="nav-link p-2">
                  My Notes
                </Link>
              </li>
              <li className="nav-item m-auto">
                <Link to="/assign-notes" className="nav-link p-2">
                  Assign Notes
                </Link>
              </li>
              <li className="nav-item m-auto">
                <button
                  disabled={sharedNoteRecord.loading}
                  className="dropdown-item border-red p-3"
                  onClick={handleEnableShareNotes}
                >
                  {sharedNoteRecord.loading
                    ? "LOADING..."
                    : sharedNoteRecord.sharedNoteRecord.is_allow
                    ? "Disabled Incoming Notes"
                    : "Enabled Incoming Notes"}
                </button>
              </li>

              <div className="dropdown m-auto mx-3 bold h6 p-2 text-center">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  WELCOME BACK |{" "}
                  <span className="text-light bold">
                    {" "}
                    {currentUser.displayName}
                  </span>
                </button>
                <ul
                  className="dropdown-menu w-100 text-center"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      className="dropdown-item border-red p-3"
                      onClick={signOutUser}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
