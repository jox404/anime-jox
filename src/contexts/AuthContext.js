import { createContext, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import { auth } from "../connections/firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* console.log(user); */

  const signup = (email, password, displayName) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async () => {
        try {
          await updateCurrentUser(auth, { displayName: "displayName" }).catch(
            (error) => console.log(error)
          );
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  const signin = async (email, password, rememberMe) => {
    console.log(email, password, rememberMe);
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    ).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          window.location.assign("/");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        localStorage.clear();
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, logout, signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
