import { Menu } from '@headlessui/react';
import { Admin } from 'features/users';
import { getAdmin } from 'features/users/api/getAdmin';
import { getAdmins } from 'features/users/api/getAdmins';
import { getUsers } from 'features/users/api/getUsers';
import { queryClient } from 'lib/react-query';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserType } from 'types';
import { MobileSideBar } from './MobileSideBar';
import { ShowMenuButton } from './ShowMenuButton';
import { SideBar } from './SideBar';
// import { redirect } from "react-router-dom";

type MainLayoutProps = {
  children?: React.ReactNode;
}

interface ProfileMenuProps {
  name: string;
  role: string;
  image? : string;
}


const NavBar = () => {
  // const pathSplitted : string[] = (useLocation().pathname.split('/').filter((str) => str.length != 0));
  // const rootPath: string = pathSplitted[0]
  // const numArguments : number = pathSplitted.length - 1
  // let pathToDisplay : string[] = []
  
  // // console.log('////////////////////path:', pathSplitted, rootPath, numArguments);

  // for (let i=0; i<pathSplitted.length; i++) {
  //   if (isNaN(+pathSplitted[i]) && i < pathSplitted.length - 1) {
  //     const name = queryClient.getQueryData(`${pathSplitted[i]}`)
  //     console.log(pathSplitted[i-1], name);
      
  //   }
  // }
  
  return (
    <nav>
      <span></span>
    </nav>
  )
}

const ProfileMenu = () => {
  let navigate = useNavigate();
  const {data: userData, status: userStatus, refetch: userRefetch} = useQuery<Admin[]>(['menuAdmins'], getAdmins)

  if (userStatus === 'loading') {
    return null
  }

  return (
    <Menu as="div" className="relative inline-block text-left rounded-md">
        <div className='rounded-md'>
          <Menu.Button className="flex text-black items-center space-x-4">
            <div className='flex flex-col text-end'>
              <span className='text-base font-semibold'>{userData?.[0].first_name} {userData?.[0].last_name}</span>
            </div>
            <div className='h-9 w-9 rounded-full bg-black'></div>
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 mt-4 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none border-[1px] border-zinc-300">    
              <Menu.Item>
                {({ active } : { active : boolean }) => (
                  <Link to={`/users/admins/` + userData?.[0].id}>
                    <div className={`${active ? 'bg-zinc-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                        <div className={`w-1 ${active ? 'bg-blue-600' : ''}`}></div>
                          <button className={`${active ? `font-normal` : `font-normal`} my-[6px] w-full flex text-base`}>
                              Profil
                          </button>
                    </div> 
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active } : { active : boolean }) => (
                  <Link to={`/auth/login/`}>
                    <div className={`${active ? 'bg-zinc-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                        <div className={`w-1 ${active ? 'bg-red-500' : ''}`}></div>
                          <button className={`${active ? `font-normal text-red-500` : `font-normal`} my-[6px] w-full flex text-base`}>
                              Wyloguj
                          </button>
                    </div> 
                  </Link>
                )}
              </Menu.Item>
          </Menu.Items>
      </Menu>
  )
}

export const MainLayout = ({children} : MainLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setShowSidebar(false)
  }, [location]);
  
  return (
    <div className='w-screen h-screen flex overflow-hidden'>
        <ToastContainer />
        <SideBar></SideBar>
        <MobileSideBar show={showSidebar} off={() => setShowSidebar(false)}></MobileSideBar>
        <div className='flex flex-col flex-1 w-full bg-zinc-100'>
        <div className='w-full h-16 py-2 bg-white shadow-md flex text-base text-black z-20 items-center lg:px-12 px-4 justify-between'>
          <ShowMenuButton onClick={() => setShowSidebar(true)}></ShowMenuButton>
          <NavBar/>
          <ProfileMenu />
        </div>
            {children}
        </div>
    </div>
  )
}