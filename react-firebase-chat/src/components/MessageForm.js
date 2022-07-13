import React, {useState} from "react";
import Attachment from "./svg/Attachment";
import Sending from "./svg/Sending";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db,  storage } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc
} from "firebase/firestore";

const MessageForm = ({  user1, chat }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setText("")
    setImg("");
    const user2 = chat.uid;

  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  
  let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    if (!text == "" || img.name) {
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
      });
  
      await setDoc(doc(db, "lastMsg", id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url  || "",
        unread: true,
      });
    } else {
      return null
    }
  };

  return (
    <>
        <div className="url">
          <p className="urlName">
            {img.name}
          </p>
        </div>
    <form className="message_form" onSubmit={handleSubmit}>
      <div>
        <div>
          <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText( e.target.value )}
          />
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="img"
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="img">
            <Attachment />
          </label>
          <button className="btn_send">
        <Sending/>
      </button>
        </div>
      </div>
    </form>
    </>
  );
};

export default MessageForm;
