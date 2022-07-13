import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Img from "../image1.jpg";
import {
    onSnapshot,
    doc,
  } from "firebase/firestore";

const UsersS = ({user1, users, selectUser, chat}) => {
    const user2 = users?.uid;
    const [data, setData] = useState(""); 
    const ids = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    useEffect(() => {
      let unsub = onSnapshot(doc(db, "lastMsg", ids), (doc) => {
        setData(doc.data());
      });
      return () => unsub();
    }, []);

  return (
      <>
      {users.map((user) => (
            <div key={user.uid}
          className={chat.uid === user.uid ? "selected_user" : "user_wrapper"  }
          onClick={() => selectUser(user)}
        >
          <div className="user_info">
            <div className="user_detail">
              <img src={user.avatar || Img} alt="avatar" className="avatar" />
              <div className="userBlock">
                <h4 className={chat.uid === user.uid ? "selected_userName" : "userName"}>{user.name || user.phone}</h4>
              </div>
            </div>
            <div style={{position: 'relative',display: 'flex', alignItems: 'center', marginLeft: 50}}>
              <div
                className={`user_status ${user.isOnline ? "online" : "offline"}`}
              >
              </div>
            </div>
  
          </div>
      
        </div>
      ))}
      </>
    )
};

export default UsersS;