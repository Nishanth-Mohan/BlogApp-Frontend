import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DashboardProfile from '../Components/DashboardProfile'
import DashboardSidebar from '../Components/DashboardSidebar'

const Dashboard = () => {
  const location = useLocation();
    const [tab,setTab] = useState('');
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)   ///this will get current location of the URL
        const tabUrl = urlParams.get('tab')    /// this will get the "tab" in that URL
        if(tabUrl){
            setTab(tabUrl)
        }

    },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-58'>
        <DashboardSidebar/>
      </div>
        {tab==='profile' && <DashboardProfile/>}
    </div>
  )
}

export default Dashboard