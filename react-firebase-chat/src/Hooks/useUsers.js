import {useState, useEffect} from "react";
import { db, auth } from "../firebase";
import {
    collection,
    query,
    onSnapshot,
    where,
  } from "firebase/firestore"

export default function useUsers([]) {
    const [users, setUsers] = useState([
        {id: 1, name: "Loading..."},
        {id: 2, name: "Loading..."},
        {id: 3, name: "Loading..."},
        {id: 4, name: "Loading..."},
        {id: 5, name: "Loading..."},
        {id: 6, name: "Loading..."},
        {id: 7, name: "Loading..."},
        {id: 8, name: "Loading..."},
        {id: 9, name: "Loading..."},
        {id: 10, name: "Loading..."},
        {id: 11, name: "Loading..."},
        {id: 12, name: "Loading..."},
      ]);
    const user1 = auth?.currentUser?.uid;
    useEffect(() =>{
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "not-in", [user1]));
        const unsub = onSnapshot(q, (querySnapshot) => {
          let users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
          });
          setTimeout(() => {
            setUsers(users);
          }, 1500)
        });
        return () => unsub()

    }, [])
    return users
};