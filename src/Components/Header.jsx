import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

    const path= useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
       <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
       <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-300 to-blue-400 rounded-lg text-white'><i>Blogger</i></span><span className='text-slate-700'>Hunt!</span>
       </Link>
       <form>
        <TextInput
         type='text'
         placeholder='Serach Blogs...'
         rightIcon={AiOutlineSearch}
         className='hidden lg:inline'
         />
       </form>
       <Button className='lg:hidden' gradientDuoTone="greenToBlue" outline pill>
        <AiOutlineSearch/>
       </Button>

       <div className='flex gap-2 md:order-2'>
       <Button className='hidden sm:inline' gradientDuoTone="greenToBlue" outline pill>
        <FaMoon/>
       </Button>

       <Link to='/signin' className=''>
        <Button gradientDuoTone="greenToBlue" outline pill>SignIn</Button>
       </Link>

       <Navbar.Toggle/>
       </div>

       <Navbar.Collapse>
        
        <Navbar.Link active={path==='/'} as={'div'}>
            <Link to='/'>Home</Link>
        </Navbar.Link>

        <Navbar.Link active={path==='/about'} as={'div'}>
            <Link to='/about'>About</Link>
        </Navbar.Link>

        <Navbar.Link active={path==='/blogs'} as={'div'}>
            <Link to='/blogs'>Blogs</Link>
        </Navbar.Link>
       </Navbar.Collapse>
    </Navbar>
  )
}

export default Header