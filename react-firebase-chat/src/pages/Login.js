import React, { useState } from "react";
import { auth, db} from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const Login = () => {
  const history = useHistory();


  const [phoneNumber, setPhoneNumber] = useState("+7")
  const [expandFrom, setExpandFrom] = useState(false)
  const [OTP, setOTP] = useState("")
  const [activ, setActiv] = useState(false)

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptha', {
      // 'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }
  
  const requestOTP = async e => {
    e.preventDefault();
    if (phoneNumber.length === 12) {
      setExpandFrom(true);
      generateReCaptcha()
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult 
      }).catch((error) => {
        console.log(error)
      })
    }
  } 


  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if(otp.length === 6) {
        console.log(otp)
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otp)
        .then((result) => {
          // if () {
            setDoc(doc(db, "users", result.user.uid), {
              uid: result.user.uid,
              phone: phoneNumber,
              createdAt: Timestamp.fromDate(new Date()),
              isOnline: true,
              aRead: false
            });
          // }
            // console.log(result.user.name)
            // if (result.user.name === null) {
            //   return activ == true 
              
            // }
            history.replace("/")
            
        }).catch((error) => {
          console.log(error)
        })
        
          // const user = result.u
          
          // await setDoc(doc(db, "users", result.user.uid), {
          //   uid: result.user.uid,
          //   name: "",
          //   phone: phoneNumber,
          //   createdAt: Timestamp.fromDate(new Date()),
          //   isOnline: true,
          //   aRead: false
          // })
    }
  }

  return (
    <>
    <div className="formContainer">
      <form onSubmit={requestOTP}>
        <div className="mb-3">
          <h2>Sing in</h2>
          <label className="labell" htmlFor="phoneNumberInput" >Phone Number</label>
          <PhoneInput
            className="phoneInput"
            defaultCountry="RU"
            placeholder="Enter phone number"
            type="tel" 
            id="phoneNumberInput"
            value={phoneNumber}
            onChange={setPhoneNumber}/>
             <label >Please enter your phone number</label>
        </div>
        {expandFrom === true? 
          <>
          <div>
            <label className="labell">OTP</label>
            <input type="number" className="OPTnput" value={OTP} onChange={verifyOTP}></input>
            <label >Please enter the one time pin sent to your phone</label>
          </div>
          </>
          :
          null
        }
        {expandFrom === false?
          <>
          <button type="submit" className="btn-verify">Request OTP</button>
          </>
          :
          null
        }
        <div id="recaptha"></div>
      </form>
    </div>
    </>
  );
};

export default Login;
