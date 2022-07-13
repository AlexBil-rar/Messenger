import React, { useEffect, useState,useRef } from "react";
import Img from "../image1.jpg";
import { onSnapshot, doc,   updateDoc,   Timestamp, } from "firebase/firestore";
import { db } from "../firebase";
import IdleTimer from "react-idle-timer";

const LastMessages = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState(""); 
  const [Usersloading, setUsersLoading] = useState(true);

  const ids = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  

  useEffect(() => {
    let unsub = onSnapshot(doc(db, "lastMsg", ids), (doc) => {
      setData(doc.data())
    });
    return () => unsub();
  }, []);

  const IdleTimerRrd = useRef(null)
  const onidle = async () => {
      await updateDoc(doc(db, "users", user1), {
        isOnline: false,
        createdAt: Timestamp.fromDate(new Date()),
      });
  }

  const onActive = async () => {
    await updateDoc(doc(db, "users", user1), {
      isOnline: true,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } 
  window.onunload = function()
  {
    onidle()
  }

  window.onfocus = function()
  {
    onActive()
  }

  if (user.id) {
    return(
      <>
        <div className={"user_wrapper"}>
          <div className="user_info">
            <div className="user_detail">
              <img src={ Img} alt="avatar" className="avatar" />
              <div className="userBlock">
                <div className={"animated-background-name"}></div>
                <div className={"flex"}>
                  <div className={"animated-background-text1"}></div>
                  <div className={"animated-background-text2"}></div>
                </div>    
              </div>
            </div>
            <div style={{position: 'relative',display: 'flex', alignItems: 'center', marginLeft: 50}}>
              <div className={"user_status offline"}>
              </div>
            </div>
          </div>
        </div>
      </>
    )
 
  }
  return (
    <>
  
      <IdleTimer
      ref={IdleTimerRrd} timeout={60 * 1000} onIdle={onidle} onActive={onActive}
    >
      {data?.from !== user1 && data?.to !== user1 ? (null) : (
        <div
      className={data?.from !== user1 && data?.unread  ? "new-messages " : chat.uid === user.uid ? "selected_user" : "user_wrapper"  }
      onClick={() => selectUser(user)}
    >
      <div className="user_info">
        <div className="user_detail">
          <img src={user.avatar || Img} alt="avatar" className="avatar" />
          <div className="userBlock">
            <h4 className={chat.uid === user.uid ? "selected_userName" : "userName"}>{user.name || user.phone}</h4>
                {data && (
                  <p className={data?.from !== user2 && data?.unread ? "unread-messeges" : null || chat.uid !== user.uid ?  "selected_truncate" : "truncate"}>
                    <strong className={chat.uid !== user.uid ? "color-black" : "color-width"} >{data.from === user1 ?  "Me: " : null}</strong>
                    <strong className={chat.uid !== user.uid ? "color-black" : "color-width"} >{!data.text ? "Фото" : data.text }</strong>
                  </p>
                )}
          </div>
        </div>
        <div style={{position: 'relative',display: 'flex', alignItems: 'center', marginLeft: 50}}>
        {data?.from !== user1 && data?.unread && (
            <div className="unread">
              <small>New</small>
            </div>
          )}
          {!data?.createdAt ? (
            null
          ) : (
          <>
            <p className={data.createdAt && chat.uid !== user.uid ? "data-time color-grey" :  "data-time color-width"}>
              {data.createdAt.toDate().toLocaleDateString([] ,{day: 'numeric' })}
            </p>
            <p className={data.createdAt && chat.uid !== user.uid ? "data-month color-grey" :  "data-month color-width"}>
            { data.createdAt.toDate().toLocaleDateString([],{month: 'long'}).substring(0, 3) }
            </p>
          </>
          )}
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          >
          </div>
        </div>

      </div>
  
    </div>
      )}
    
    </IdleTimer>
      
    </>
  );
};

export default LastMessages;
