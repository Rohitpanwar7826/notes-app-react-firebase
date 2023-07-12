import { lazy, Suspense } from "react";
import Header from "./components/Header";
const NotesApp = lazy(() => import("./components/NewNotes"));
import SignInOptions from "./components/SignInOptions/Index";
import CurrentUserProvider from "./context/CurrentUserProvider";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
const PrivateSection = lazy(() => import("./components/PrivateSection"));
import PublicSection from "./components/PublicSection";
const MyNotes = lazy(() => import("./components/MyNotes"));
import Loader from "./components/shared/Loader";
import "./App.css";
import EditNote from "./components/MyNotes/EditNote";
import AssignNotes from "./components/AssignNotes";
import AssignView from "./components/AssignNotes/AssignView";
import EditAssign from "./components/AssignNotes/EditAssign";
import Footer from "./components/Footer";
const ViewNote = lazy(() => import("./components/MyNotes/ViewNote"));

function App() {
  return (
    <>
      <CurrentUserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <>
              <Route
                path="/sign-in"
                element={<PublicSection Comp={SignInOptions} />}
              />

              <Route path="/my-notes" element={<Outlet />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<Loader />}>
                      <PrivateSection
                        Comp={
                          <Suspense fallback={<Loader />}>
                            <MyNotes />
                          </Suspense>
                        }
                      />
                    </Suspense>
                  }
                />

                <Route
                  path=":note_id/view"
                  element={
                    <Suspense fallback={<Loader />}>
                      <PrivateSection
                        Comp={
                          <Suspense fallback={<Loader />}>
                            <ViewNote />
                          </Suspense>
                        }
                      />
                    </Suspense>
                  }
                />

                <Route
                  path=":note_id/edit"
                  element={
                    <Suspense fallback={<Loader />}>
                      <PrivateSection
                        Comp={
                          <Suspense fallback={<Loader />}>
                            <EditNote />
                          </Suspense>
                        }
                      />
                    </Suspense>
                  }
                />
              </Route>

              <Route path="/assign-notes" element={<Outlet />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<Loader />}>
                      <PrivateSection
                        Comp={
                          <Suspense fallback={<Loader />}>
                            <AssignNotes />
                          </Suspense>
                        }
                      />
                    </Suspense>
                  }
                />

                <Route
                  path=":assign_note_id/view"
                  element={
                    <Suspense fallback={<Loader />}>
                      <PrivateSection
                        Comp={
                          <Suspense fallback={<Loader />}>
                            <AssignView />
                          </Suspense>
                        }
                      />
                    </Suspense>
                  }
                />

                <Route
                  path=":assign_note_id/edit"
                  element={
                    <Suspense fallback={<Loader />}>
                      <PrivateSection
                        Comp={
                          <Suspense fallback={<Loader />}>
                            <EditAssign />
                          </Suspense>
                        }
                      />
                    </Suspense>
                  }
                />
              </Route>

              <Route
                path="/"
                element={
                  <Suspense fallback={<Loader />}>
                    <PrivateSection
                      Comp={
                        <Suspense fallback={<Loader />}>
                          <NotesApp />
                        </Suspense>
                      }
                    />
                  </Suspense>
                }
              />
            </>
          </Routes>
          <Footer />
        </BrowserRouter>
      </CurrentUserProvider>
    </>
  );
}

export default App;
