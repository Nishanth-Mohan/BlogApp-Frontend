import React, { useState } from 'react'
import { Alert, Button, Card, Tooltip } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiInformationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import UserHomepage from '../Components/UserHomepage';

const Home = () => {
  const {currentuser} = useSelector((state)=>state.user)
  const [users,setUsers] = useState([]);
  const [errorGettingUsers, setErrorGettingUsers] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  const handleClick = async () => {
    if(showUsers){
      setShowUsers(false);
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/user/getusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "token": localStorage.getItem("Token"),
        },
      });
  
  
      if (!response.ok) {
        setErrorGettingUsers('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      setUsers(data);
      setShowUsers(true);
      
      
    } catch (error) {
      setErrorGettingUsers(error.message);
    }
  };
  
  return (
    <div>
      {(currentuser.rest.isAdmin === true)?(<>
        <Card className="max-w-screen-xl bg-amber-100">
       <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Admin Details<MdAdminPanelSettings /></h5>
        <Link to='/dashboard?tab=profile'>
        <Button gradientDuoTone="greenToBlue" className="text-sm font-medium hover:underline dark:text-cyan-100" >
          Update
        </Button>
        </Link>
      </div>
      <div className="flow-root">
        <ol className="divide-y divide-gray-200 dark:divide-gray-700"> 
          
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Bonnie image"
                  height="32"
                  src={currentuser.rest.profilePicture}
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Username: {currentuser.rest.username}</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">Email: {currentuser.rest.email}</p>
              </div>
              <div className="items-center text-base font-mono text-gray-900 dark:text-white">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">CreatedAt: {currentuser.rest.createdAt}</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">UpdatedAt: {currentuser.rest.createdAt}</p>
              </div>
            </div>
          </li>
          
        </ol>
      </div>
       </Card>

       <div>
       <Card className="max-w-screen-xl bg-amber-100">
       <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">BlogApp Users<FaUsers /></h5>
        <div className="flex flex-col items-end">
        {(currentuser.rest.isAdmin === true)?(<Button onClick={handleClick} className="text-sm font-medium hover:underline dark:text-cyan-100" gradientDuoTone="greenToBlue" disabled={showUsers} >
          View all
        </Button>):(<><Tooltip content="Only admin can view all users" placement="bottom"><Button className="text-sm font-medium hover:underline dark:text-cyan-100" gradientDuoTone="greenToBlue" disabled>
          View all
        </Button></Tooltip></>)}  
        </div>
        
      </div>
      <div className="flow-root">
        <ol className="divide-y divide-gray-200 dark:divide-gray-700"> 
         
          {users.map((ele,index)=>{
           return(
            <li className="py-3 sm:py-4" key={index}>
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Bonnie image"
                  height="32"
                  src={ele.profilePicture}
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Username: {ele.username}</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">Email: {ele.email}</p>
              </div>
              <div className="items-center text-base font-mono text-gray-900 dark:text-white">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">CreatedAt: {ele.createdAt}</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">UpdatedAt: {ele.createdAt}</p>
              </div>
            </div>
          </li>
           )        
          })}
          
        </ol>
      </div>
          </Card>
       </div>   
       {errorGettingUsers && (<Alert color="failure" className='mt-4' icon={HiInformationCircle}>
            <span className="font-medium">OOPS!📝</span>&nbsp;{errorGettingUsers}.
          </Alert>)
         }</>):(<>
         
        <UserHomepage/> </>)}
          
   
    </div>

    
        
    
  )
}

export default Home