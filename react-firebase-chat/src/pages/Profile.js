import React, { useState, useEffect } from "react";
import Camera from "../components/svg/Camera";
import Img from "../image1.jpg";
import { storage, db, auth } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import Updata from "../components/svg/Updata";

const UserProfile = ({Active, setActive, setProfileActive, userName, setUserName}) => {
  const [name, setName] = useState("");
  const [upDate, setUpDate] = useState(false)
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const history = useHistory("");

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img]);
  // console.log(user)

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
        history.replace("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const user1 = auth?.currentUser?.uid;
  const UserNameHandle = async e => {
    e.preventDefault();
    await updateDoc(doc(db, "users", user1), {
       name: userName 
      })
      window.location.reload();
  }

  const buttonActive = () => {
    setProfileActive(false)
    setActive(Active == false ? true : Active == true ? null : Active == null )
  }
  

  return (
    <>
    {upDate == false ? (
      <div>
        <div className="profile-setting">
          <button 
          className="detal_button"
          onClick={buttonActive}
          >
            <div className={Active == false ? "burger-clouse" : Active == true ? "burger-menu" :Active == null? "burger_cross" : ""}></div>
            <div className={Active == false ? "burger-clouse" : Active == true ? "burger-menu" :Active == null? "burger_cross" : ""}></div>
            <div className={Active == false ? "burger-clouse" : Active == true ? "burger-menu" :Active == null? "burger_cross" : ""}></div>
          </button>
          <h3 className="label-profile">Профиль</h3>
          <button
            className="btn-update"
            onClick={() => setUpDate(true)}
          >
            <Updata/>
          </button>
      </div>
      <div className="container-user-profile">
        <img src={user?.avatar || Img} className="img-profile-user" alt="avatar"/>
        <div className="user-profile">
          <h3 className="user-name-profile">{user?.name}</h3>
          {user?.isOnline == true ? (
            <p className="user-online-profile">онлайн</p> 
            ):(
            <p className="user-online-profile">оффлайн</p>
          )}
        </div>
      </div>
      <div>
          <h3 className="user-phone-profile">{user?.phone}</h3>
      </div>
    </div>
    ) : (
      <div>
        <div className="profile-setting">
          <button 
          className="detal_button"
          onClick={() => setUpDate(false)}
          >
            <div className={"burger-clouse"}></div>
            <div className={"burger-clouse"}></div>
            <div className={"burger-clouse"}></div>
          </button>
          <h3 className="label-profile">Обнавление Профиля</h3>
          <button
            className="button-NAN"
          >
            
          </button>
        </div>
        <div>
          <form className="container-update" onSubmit={UserNameHandle}>
            <div style={{position: 'relative'}}>
              <img  src={user.avatar || Img} alt="avatar" className="avatar-update"/>
                <label htmlFor="photo" className="svg-update">
                  <Camera/>
                </label>
                <input
                type="file"
                accept="image/*"
                className="update-file"
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            
            <input
              className="update-user-name"
              placeholder={user.name}
              value={userName}
              onChange={(e) => setUserName( e.target.value )}
            />
            <button
              className="btn btn-user-update"
            >
              Обнавить 
            </button>
          </form>
        </div>
      </div>
    )}
      </>
    
    
  //   <section>
  //     <div className="profile_container">
  //       <div className="img_container">
  //         <img src={user.avatar || Img} alt="avatar" />
  //         <div className="overlay">
  //           <div>
  //             <label htmlFor="photo">
  //               <Camera />
  //             </label>
  //             {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
  //             <input
  //               type="file"
  //               accept="image/*"
  //               style={{ display: "none" }}
  //               id="photo"
  //               onChange={(e) => setImg(e.target.files[0])}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="text_container">
  //         <h3>{user.name}</h3>
  //         <input
  //               type="text"
  //               onChange={(e) => setName(e.target)}
  //             />
  //         <p>{user.email}</p>
  //         <hr />
  //         <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
  //       </div>
  //     </div>
  //   </section>
  ) 
};

export default UserProfile;
