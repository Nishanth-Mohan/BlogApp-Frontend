import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiInformationCircle } from "react-icons/hi";
import OAuth from '../Components/OAuth';
import GithubOath from '../Components/GithubOath';

const SignUp = () => {
  // const [username,setUsername] = useState('')
  // const [email,setEmail] = useState('')
  // const [password,setPassword] = useState('')

 const [formData, setFormdata] = useState({});
 const [loading, setLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState(null);
 const navigate = useNavigate();

  const handleChange = (e)=>{
      setFormdata({...formData,[e.target.id]: e.target.value.trim()})
      //console.log(formData);
  }

  const handleSubmit = async(e)=>{
     e.preventDefault();
     if(!formData.username || !formData.email || !formData.password){
          return setErrorMessage("please fill out the fields");
     }
    
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/register-user',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
        
      })
      
      const data = await response.json();
      if(data.success === false){
          return setErrorMessage(data.message);
      }

      if(response.ok){
        navigate('/signin')     
      }
     
    } catch (error) {
    //console.log(error);
    setErrorMessage(error.message);
    setLoading(false);
    }
  }
  return (
    <div className='min-h-screen mt-20'>
       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>

        <div className='flex-1'>
            <div className='font-bold text-4xl dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-300 to-blue-400 rounded-lg text-white'><i>Blogger</i></span><span className='text-slate-700'>Hunt!</span>
            </div>
            <p className='text-sm mt-6'>You can signup with your Email and password or using Google. **This is the demo project**</p>
        </div>

        <div className='flex-1 mt-2'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Username'/>
              <TextInput type='text' placeholder='Enter Your User Name' id='username' onChange={handleChange}/>
            </div>

            <div>
              <Label value='Email'/>
              <TextInput type='text' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>

            <div>
              <Label value='Password'/>
              <TextInput type='password' placeholder='Enter Your Password' id='password' onChange={handleChange}/>
            </div>

            <Button gradientDuoTone="greenToBlue" type='submit' disabled={loading}>
              {loading?(<><Spinner color="info" aria-label="Success spinner example" size='sm'/> <span className='pl-2'>Loading...</span></>):('Sign Up')}
            </Button>
             
            <OAuth/>
            <GithubOath/>
          </form>
          <div className='text-sm mt-6'>
            <span>Already Have An Account?</span> <Link to='/signin' className='text-green-700 font-semibold'>Sign In</Link>
          </div>
          {errorMessage && (<Alert color="failure" className='mt-4' icon={HiInformationCircle}>
            <span className="font-medium">OOPS!📝</span>&nbsp;{errorMessage}.
          </Alert>)}
        </div>
       </div>
    </div>
  )
}

export default SignUp