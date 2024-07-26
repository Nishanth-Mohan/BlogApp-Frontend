import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { toggleTheme } from '../Redux/Slice/themeSlice'

const Header = () => {

    const path= useLocation().pathname;
    const {currentuser}= useSelector((state)=>state.user)
    const {theme}= useSelector((state)=>state.theme)
    const dispatch = useDispatch();
    console.log(currentuser);
  return (
    <Navbar className='border-b-2 dark:bg-black'>
       <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
       <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-300 to-blue-400 rounded-lg text-white'><i>Blogger</i></span>Hunt!
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
       <Button className='hidden sm:inline' gradientDuoTone="greenToBlue" pill onClick={()=>dispatch(toggleTheme())}>
        {theme=='dark'?(<FaSun/>):(<FaMoon/>)}
       </Button>

       {currentuser?(
        <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentuser.rest.profilePicture} rounded />}>
           <Dropdown.Header>
             <span className="block text-sm">{currentuser.rest.username}</span>
             <span className="block truncate text-sm font-medium">{currentuser.rest.email}</span>
           </Dropdown.Header>
           <Link to={'/dashboard?tab=profile'}>
           <Dropdown.Item>Profile</Dropdown.Item>
           </Link>
           <Dropdown.Divider />
           <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
       ):(
        <Link to='/signin' className=''>
         <Button gradientDuoTone="greenToBlue" outline pill>SignIn</Button>
        </Link>
       )}

       

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