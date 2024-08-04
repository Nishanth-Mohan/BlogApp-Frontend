import { Button } from 'flowbite-react'
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { signInFailure, signInSuccess } from '../Redux/Slice/userSlice';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const OAuth = () => {
   const auth = getAuth(app)
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleSubmit = async()=>{
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'})
      try {
        const result = await signInWithPopup(auth, provider)
        const res = await fetch("http://localhost:5000/api/auth/google",{
            method:'POST',
            headers:{
                'Content-Type': 'Application/json'
            },
            body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                profilePic:result.user.photoURL
            })
        })
        const data = await res.json();

        if(res.ok){
           localStorage.setItem("Token",data.token)
           dispatch(signInSuccess(data))
           navigate('/')
        }
      } catch (error) {
        dispatch(signInFailure(error.message))
      }
   }

  return (
   
    <Button gradientDuoTone="greenToBlue" type='button' onClick={handleSubmit}>
        <FcGoogle className='w-5 h-5 mr-1 bg-white'/>
        Continue with Google
    </Button>
    
  )
}

export default OAuth