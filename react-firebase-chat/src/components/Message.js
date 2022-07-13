import React, { useRef, useEffect } from "react";

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <>
           <div
      className={`message_wrapper ${msg.from === user1 ? "own" : "his"}`}
      ref={scrollRef}
    >
          { msg.media && msg.text ? ( 
            <>
          <div className={msg.from === user1 ? "me-text-photo" : "friend-text-photo"}>
             <img src={msg.media} alt={msg.text}/>  
             <div>
              {msg.text}   
                <span >
                {msg.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span> 
             </div>
            </div>
            {/* <div className={msg.from === user1 ? "triangleMe" : "triangleFriend"}/> */}
            </>
          ): msg.media ? (
            <div className={msg.from === user1 ? "me-photo" : "friend-photo"}>
              <div className="posDiv">
                <span>
                  {msg.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>  
                <img src={msg.media} alt={msg.text}/>  
            </div>
          ) : msg.text ? (
            <>
            <div className={msg.from === user1 ? "me" : "friend"}>
            <>
            {msg.text} 
            <span>
              {msg.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span> 
            </>
            </div>
            {/* <div className={msg.from === user1 ? "triangleMe" : "triangleFriend"}/> */}
            </>
          ): null }
      </div>
      </>
  );
};

export default Message;
