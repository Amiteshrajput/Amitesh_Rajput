import React from 'react'
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig/firebaseConfig';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig/firebaseConfig';
import './LogIn.css'

function LogIn({type}) {
  const navigate=useNavigate()
  const signIn=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(async(result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;//userThat is signin-ing  in
    console.log(user)
    
    const docRef = doc(db, "adminData", user.uid);
    const docSnap = await getDoc(docRef);
    const userData=docSnap.data()//user on database like admin or premium user
    console.log(type+''+JSON.stringify(userData))
    if(user && userData && userData.email===user.email){
      alert('Admin SignIn successfull')
      navigate('/admin/profile')
    }
    else{
      alert('Admin SignIn Unsuccessfull')
      navigate('/')
    }
    // if(userData && userData.type===type){
    //   //profile
    // }
    // else if(userData && userData.type!==type){
    //   //invalid access  or invalid type user accessing
    //   alert(`Invalid access as you are trying to signIn as ${type} but you onboarded as ${userData.type} using this email`)
    // }
    // else{
    //   //onBoarding
    //   console.log(type+''+userData)
    // }
  }).catch((error) => {
    // // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.customData.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error)
  });
  }
  return(
    <div className='auth-container'>
      <h1>Welcome {type}</h1>
      <h2>Sign In</h2>
      <br/><br/>
      <button type="button" onClick={signIn}>
        <img src="https://shortcuts-france.fr/wp-content/uploads/2021/04/google-logo-carre-2015-09-400.png" alt=""/>
        <h2>Sign in</h2>
      </button>
    </div>
  )
}
export default LogIn