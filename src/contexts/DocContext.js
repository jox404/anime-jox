import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../connections/firebase";
import { handleDontExistsFirebase } from "../Tools/handleDontExistsFirebase";

const DocContext = createContext();

const DocContextProvider = ({ children }) => {
  const [userAnimeData, setUserAnimeData] = useState(null);
  const { user } = useContext(AuthContext);

  const userRef = user ? doc(db, "users", user.uid) : null;

  const updateLocalStorage = async () => {
    const dataDoc = await getDoc(userRef);
    const animeData = await handleDontExistsFirebase(dataDoc);
    localStorage.setItem("animeData", JSON.stringify(animeData));
    setUserAnimeData(null);
  };

  const updateAnimeList = async (exists, data, listName) => {
    if (!exists) {
      try {
        await updateDoc(userRef, {
          [`animeList.${listName}`]: arrayUnion(data),
        });
        updateUserAnimeData();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(userRef, {
          [`animeList.${listName}`]: arrayRemove(data),
        });
        updateUserAnimeData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateUserAnimeData = () => {
    if (user) {
      (async () => {
        await updateLocalStorage();
        const data = JSON.parse(localStorage.getItem("animeData"));
        if (data || data !== userAnimeData) {
          setUserAnimeData(data);
        }
      })();
    } else {
      setUserAnimeData(null);
    }
  };

  useEffect(() => {
    updateUserAnimeData();
  }, [user]);

  return (
    <DocContext.Provider
      value={{ updateAnimeList, userAnimeData, updateUserAnimeData }}
    >
      {children}
    </DocContext.Provider>
  );
};

export { DocContext, DocContextProvider };
