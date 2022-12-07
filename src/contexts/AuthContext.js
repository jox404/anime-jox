import { createContext, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../connections/firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const signup = async (email, password, displayName) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async () => {
        try {
          await updateProfile(auth.currentUser, {
            displayName: "displayName",
          });
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            animeList: {
              dropped: [],
              favorites: [],
              seeLater: [],
              watching: [],
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    );

    try {
      await user.updateProfile({ displayName: "TESTE" });
    } catch (error) {
      console.log(error);
    }
  };
  const signin = async (email, password, rememberMe) => {
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
    await signOut(auth);
    await localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const isLogged = localStorage.getItem("user");
    if (isLogged) {
      setUser(JSON.parse(isLogged));
      setIsLoaded(true);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        if (currentuser) {
          const userData = {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            email: currentuser.email,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setIsLoaded(true);
        } else {
          setIsLoaded(true);
        }
      });
      return async () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, signup, signin }}>
      {isLoaded ? children : <></>}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
