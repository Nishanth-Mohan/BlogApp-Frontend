import React from 'react'
import { Button, Drawer, Sidebar, TextInput,Carousel } from "flowbite-react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

const UserHomepage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => setIsOpen(false);
  return (
    
    <div>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <Link to='/dashboard?tab=profile'>
          <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." className='w-full'/>
        </Link>
        <Link to='/dashboard?tab=profile'>
          <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." className='w-full'/>
        </Link>
        <Link to=''>
          <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." className='w-full'/>
        </Link>
        <a href="https://mausam.imd.gov.in/responsive/monsooninformation.php" target="_blank" rel="noopener noreferrer">
          <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="India Meteorological Department" className='w-full'/>
        </a>
        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
          <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="Google Maps" className='w-full'/>
        </a>
      </Carousel>
    </div>
        <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                      Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="/e-commerce/products" icon={HiShoppingBag}>
                      Products
                    </Sidebar.Item>
                    <Sidebar.Item href="/users/list" icon={HiUsers}>
                      Users list
                    </Sidebar.Item>
                    <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                      Sign in
                    </Sidebar.Item>
                    <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                      Sign up
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/" icon={HiClipboard}>
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
    </div>
   
  )
}

export default UserHomepage