import { Menu } from '@headlessui/react';
import { getUsers } from 'features/users/api/getUsers';
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
  const pathSplitted : string[] = (useLocation().pathname.split('/').filter((str) => str.length != 0));
  const rootPath: string = pathSplitted[0]
  const numArguments : number = pathSplitted.length - 1
  let pathToDisplay : string[] = []
  
  
  return (
    <nav>
      <span></span>
    </nav>
  )
}

const ProfileMenu = () => {
  let navigate = useNavigate();
  const userQuery = useQuery(['users'], () => getUsers(UserType.ADMIN))

  if (userQuery.isLoading) {
    return null
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex text-black items-center space-x-4">
            <div className='flex flex-col text-end'>
              <span className='text-base font-semibold'>{userQuery.data[0].first_name} {userQuery.data[0].last_name}</span>
              <span className='text-sm'>{userQuery.data[0].role}</span>
            </div>
            <div className='h-9 w-9 rounded-full bg-black'></div>
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active } : { active : boolean }) => (
                  <Link to={`/users/admins/` + userQuery.data[0].id}>
                    <button
                      className={`${
                        active ? 'bg-blue-100' : 'text-black'
                      } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                    >
                      Profil
                    </button>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active } : { active : boolean }) => (
                  // <Link to='/auth/login/'>
                    <button
                      className={`${
                        active ? 'bg-blue-100' : 'text-black'
                      } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                      onClick={() => navigate('/auth/login')}
                    >
                      Wyloguj
                    </button>
                  // </Link>
                )}
              </Menu.Item>
            </div>
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