import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import { auth } from "../connections/firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* console.log(user); */

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
  }, []);

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
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
