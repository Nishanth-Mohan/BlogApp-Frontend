import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Username'/>
              <TextInput type='text' placeholder='Enter Your User Name' id='username'/>
            </div>

            <div>
              <Label value='Email'/>
              <TextInput type='text' placeholder='name@company.com' id='email'/>
            </div>

            <div>
              <Label value='Password'/>
              <TextInput type='password' placeholder='Enter Your Password' id='password'/>
            </div>

            <Button gradientDuoTone="greenToBlue" type='submit'>SignUp</Button>

          </form>
          <div className='text-sm mt-6'>
            <span>Already Have An Account?</span> <Link to='/signin' className='text-green-700 font-semibold'>Sign In</Link>
          </div>
        </div>
       </div>
    </div>
  )
}

export default SignUp