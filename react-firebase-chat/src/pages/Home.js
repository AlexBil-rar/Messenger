import React, { useEffect, useState, useMemo} from "react";
import { useHistory } from "react-router-dom";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import LastMessages from "../components/User";
import Moment from "react-moment";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import Split from 'react-split'
import UsersS from "../components/Users.Search";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";
import UserProfile from "./Profile";
import DetalBar from "../components/DetalBar";
import Modal from "../components/Modal";
import useUsers from "../Hooks/useUsers";

const Home = () => {
  const users = useUsers([])
  const [chat, setChat] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [user, setUser] = useState();
  const [Active, setActive] = useState(true)
  const [ProfileActive, setProfileActive] = useState(false)
  const [userName, setUserName] = useState("")
  const [usersSort, setUsersSort] = useState("");
  const [usersSeacrh, setUsersSeacrh] = useState("");
  const [UserActive, setUserActive] = useState(true)
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const UserNameHandle = async e => {
    e.preventDefault();
    await updateDoc(doc(db, "users", user1), {
       name: userName 
      })
   setUserActive(true)
   window.location.reload();
  }

  useMemo(() => {
    onAuthStateChanged(auth, () => {
      const name = user?.name
      if ((name == undefined) == true) {
        setUserActive(false)
      } else {
        setUserActive(true)
      }

      setTimeout(() =>{setLoading(false)  },700) ;
    });
  })

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };    

  const user1 = auth?.currentUser?.uid;
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      };
    });
  }, []);


  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });

      setMsgs(msgs)
    });
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };
  
  const sortedUsers = useMemo(() => {
    if(usersSort) {
      return [...users].sort((a,b) => a[usersSort].localeCompare(b[usersSort]))
    }
    return users
  }, [usersSort, users])

  const sortedSearchUsers = useMemo(() => {
    return sortedUsers.filter(users => users.name.toLowerCase().includes(usersSeacrh))
  }, [usersSeacrh, sortedUsers])

  console.log(users)


   if(loading) {
    return(
      <Loading/>
    ) 
   }
  return (
      <Split
        className="home_container"
        direction="horizontal"
        sizes={[20,80]}
        minSize={[250, 1380]}
      >
        <div className="users_container">
          <DetalBar
          Active={Active}
          setActive={setActive}
          setProfileActive={setProfileActive}
          handleSignout={handleSignout}
          setUsersSeacrh={setUsersSeacrh}
          usersSeacrh={usersSeacrh}
          />
          <div  className={Active !== false || null ? 'noUseActive' : "UseActive"}>
            {sortedSearchUsers.length ?
              <UsersS
              key={user.uid || user.id}
              users={sortedSearchUsers}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
              msgs={msgs}
            />
             : 
             <h3 className="undefined-text">не найдено:(</h3>}
          </div>
          <div 
            onClick={() => setActive(Active == null ? true : true )}
            className={Active === false ? 'noActive' : "Active"} 
          >
            {users.map((user) => (
              <LastMessages
                key={user.uid || user.id}
                user={user}
                selectUser={selectUser}
                user1={user1}
                chat={chat}
                msgs={msgs}
              />
            ))}
          </div>
          <div className={ProfileActive == true ? "Profile_bar" : "No-Profile_bar"}>
            <UserProfile
              userName={userName}
              Active={Active}
              ProfileActive={ProfileActive}
              setProfileActive={setProfileActive}
              setActive={setActive}
              UserNameHandle={UserNameHandle}
              setUserName={setUserName}
            />
          </div>

        </div>
        <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">

              <h3 className="NameUser">{chat.name || chat.phone}</h3>
              {chat.isOnline ? (
                <h3 className="isOnline">В сети</h3>
              )
              :
              (
                <Moment fromNow className="status">{chat.createdAt.toDate()}</Moment>
              )}
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
              <MessageForm
              user1={user1}
              chat={chat}
            />
          </>
        ) : (
          <h6 className="no_conv">тут пока ничего нет:(</h6>
        )}
      </div>
      {UserActive === false ? (
        <Modal
        setUserName={setUserName}
        userName={userName}
        UserNameHandle={UserNameHandle}
        />
      ): null}
      </Split>
  )
}

export default Home;
