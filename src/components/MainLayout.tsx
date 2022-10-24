import { Menu } from '@headlessui/react';
import { getUsers } from 'features/users/api/getUsers';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PanelType, UserType } from 'types';
import { ContentPanel } from './ContentPanel';
import { MobileSideBar } from './MobileSideBar';
import { ShowMenuButton } from './ShowMenuButton';
import { SideBar } from './SideBar';
import { Spinner } from './Spinner';

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
  let navigate = useNavigate();
  
  
  return (
    <nav>
      <span></span>
    </nav>
  )
}

const ProfileMenu = ({name, role} : ProfileMenuProps) => {
  const userQuery = useQuery(['users'], () => getUsers(UserType.ADMIN))

  if (userQuery.isLoading) {
    return null
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex text-black items-center space-x-4">
            <div className='flex flex-col text-end'>
              <span className='text-base font-semibold'>{name}</span>
              <span className='text-sm'>{role}</span>
            </div>
            <div className='h-9 w-9 rounded-full bg-black'></div>
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active } : { active : any }) => (
                  <Link to={`/users/` + userQuery.data[0].id}>
                    <button
                      className={`${
                        active ? 'bg-blue-100 text-white' : 'text-black'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Profil
                    </button>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active } : { active : any }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-100 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Wyloguj
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
      </Menu>
  )
}

export const TopBar = () => {
  return (
    <div className='w-full h-1 bg-white shadow-md flex text-base text-black z-20 items-center px-12 justify-between'>
        <ShowMenuButton></ShowMenuButton>
        <NavBar/>
        <ProfileMenu name='Bartosz Bębel' role='Dydaktyk'/>
    </div>
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
        <SideBar></SideBar>
        <MobileSideBar show={showSidebar} off={() => setShowSidebar(false)}></MobileSideBar>
        <div className='flex flex-col flex-1 w-full bg-zinc-100'>
        <div className='w-full h-16 py-2 bg-white shadow-md flex text-base text-black z-20 items-center lg:px-12 px-4 justify-between'>
          <ShowMenuButton onClick={() => setShowSidebar(true)}></ShowMenuButton>
          <NavBar/>
          <ProfileMenu name='Bartosz Bębel' role='Dydaktyk'/>
        </div>
            {children}
        </div>
    </div>
  )
}