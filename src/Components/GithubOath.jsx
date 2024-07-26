import React from 'react'
import { Button } from 'flowbite-react'
import { FaGithub } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { signInFailure, signInSuccess } from '../Redux/Slice/userSlice';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const GithubOath = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth(app);
    
    const handleSubmit = async()=>{
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider)
            const userData = {
                name:result.user.displayName,
                email:result.user.email,
                profilePic:result.user.photoURL
            }
            console.log(result.user);
            const res = await fetch('http://localhost:5000/api/auth/github/callback',{
                method:'POST',
                headers:{
                    'Content-Type':'application/JSON'
                },
                body:JSON.stringify(userData)
            })

            const data = await res.json();
            console.log(data);

            if(res.ok){
                dispatch(signInSuccess())
                navigate('/')
            }
            
        } catch (error) {
            dispatch(signInFailure(error))
        }
    }
    
  return (
    <Button gradientDuoTone="greenToBlue" type='button' onClick={handleSubmit}>
        <FaGithub className='w-5 h-5 mr-1 bg-dark'/>
        Continue with GitHub
    </Button>
  )
}

export default GithubOath