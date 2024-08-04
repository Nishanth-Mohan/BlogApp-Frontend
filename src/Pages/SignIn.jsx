import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../Redux/Slice/userSlice';
import OAuth from '../Components/OAuth';
import GithubOath from '../Components/GithubOath';


const SignIn = () => {
  const [formData, setFormdata] = useState({});
  const {loading,error:errorMessage}= useSelector((state)=>state.user);
  const dispatch = useDispatch();
 const navigate = useNavigate();

  const handleChange = (e)=>{
      setFormdata({...formData,[e.target.id]: e.target.value.trim()})
      //console.log(formData);
  }

  const handleSubmit = async(e)=>{
     e.preventDefault();
     if(!formData.email || !formData.password){
          return dispatch(signInFailure("please fill out the fields"));
     }
    
    try {
      dispatch(signInStart());
      const response = await fetch('http://localhost:5000/api/auth/login-user',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
        
      })
      
      const data = await response.json();
      if(data.success === false){
          return dispatch(signInFailure(data.message));
      }

      if(response.ok){
        localStorage.setItem('Token',data.token)     // This line is to set the Token coming from backend
        dispatch(signInSuccess(data))
        navigate('/home')     
      }
     
    } catch (error) {
    //console.log(error);
    dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='min-h-screen mt-20'>
       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>

        <div className='flex-1'>
            <div className='font-bold text-4xl dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-300 to-blue-400 rounded-lg text-white'><i>Blogger</i></span><span className='text-slate-700'>Hunt!</span>
            </div>
            <p className='text-sm mt-6'>You can signin with your Email and password or using Google. **This is the demo project**</p>
        </div>

        <div className='flex-1 mt-2'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
            <div>
              <Label value='Email'/>
              <TextInput type='text' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>

            <div>
              <Label value='Password'/>
              <TextInput type='password' placeholder='Enter Your Password' id='password' onChange={handleChange}/>
            </div>

            <Button gradientDuoTone="greenToBlue" type='submit' disabled={loading}>
              {loading?(<><Spinner color="info" aria-label="Success spinner example" size='sm'/> <span className='pl-2'>Loading...</span></>):('Sign In')}
            </Button>
            
            <OAuth/>
            <GithubOath/>
          </form>

          <div className='text-sm mt-6'>
            <span>Don't Have An Account?</span> <Link to='/signup' className='text-green-700 font-semibold'>Sign Up</Link>
          </div>
    
          {errorMessage && (<Alert color="failure" className='mt-4' icon={HiInformationCircle}>
            <span className="font-medium">OOPS!📝</span>&nbsp;{errorMessage}.
          </Alert>)}
        </div>
       </div>
    </div>
  )
}

export default SignIn