import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import ToDoList from "./ToDoList";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { UserAuthContext } from "../services/UserContext";

interface Todolist {
  name: string;
  theme: string;
  id: string;
}

export default function ToDoListsContainer() {
  const { user } = useContext(UserAuthContext);
  const [todolists, setTodolists] = useState<Todolist[]>([]);

  const todolistsCollection = collection(db, `users/${user?.uid}/todolists`);

  const q = query(todolistsCollection, orderBy("date"));
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      let tmp: Todolist[] = [];
      snapshot.docs.forEach((docSnap) => {
        tmp.push({ ...(docSnap.data() as Todolist), id: docSnap.id }); // Allow to have the id in the state and not have to stock it in firestore
      });
      setTodolists(tmp);
    });
  }, [user]);

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <ToDoList
            title={todolist.name}
            theme={todolist.theme}
            id={todolist.id}
            key={todolist.id}
          />
        );
      })}
    </>
  );
}
