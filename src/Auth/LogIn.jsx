import React,{ useContext } from 'react'
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig/firebaseConfig';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig/firebaseConfig';
import './LogIn.css'
import { UserContext } from '../Contexts/UserContext';

function LogIn({type}) {
  const [state,dispatch]=useContext(UserContext)

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
    
    const docRef = doc(db, "usersData", user.uid);
    const docSnap = await getDoc(docRef);
    const userData=docSnap.data()//users on database like admin or premium user
    console.log(userData,type)
    
    if(userData && userData.type===type && user.email===userData.email){
      if(type==='admin'){
        alert('Admin SignIn successfull')
        console.log('hi in if')
        
        
        
        // sessionStorage.setItem('admin',JSON.stringify(user))
        
        //profile
        setTimeout(()=>{
          setTimeout(()=>{
            setTimeout(()=>{
              dispatch({type:'SET_ADMIN',payload:user});
            },1000)
            navigate(`/admin/profile`);
          },1000)
        
          dispatch({type:'SET_LOG',payload:true});
        },2000)
       
      }
      else{
        alert('Premium User SignIn successfull')
        sessionStorage.setItem('premiumUser',JSON.stringify(user))
        //subscriber or premium user
        setTimeout(()=>{navigate(`/premiumUser`)},3000)
      }
    }
    else if(userData && (userData.type!==type || user.email!==userData.email)){
      //invalid access  or invalid type user accessing
      alert(`Invalid access`)
      console.log('hi in else-if')
      setTimeout(()=>{navigate(`/`)},2000)
    }
    else{
      console.log('hi in else')
      setTimeout(()=>{navigate(`${type}/auth`)},1000)
    }

    // console.log(type+''+JSON.stringify(userData))
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