import { Menu } from '@headlessui/react';
import AuthContext, { initialAuthUserInfo } from 'context/AuthContext';
import { AuthUserInfo } from 'features/auth';
import { logout } from 'features/auth/api/logout';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MobileSideBar } from './MobileSideBar';
import { ShowMenuButton } from './ShowMenuButton';
import { SideBar } from './SideBar';

type MainLayoutProps = {
  children?: React.ReactNode;
}

const NavBar = () => {
  return (
    <nav>
      <span></span>
    </nav>
  )
}

const ProfileMenu = () => {
  let navigate = useNavigate();
  const {authUser, setAuthUser} = useContext(AuthContext)

  // TODO MOVE TO CUSTOM HOOK
  const handleLogout = async () => {
    const res = await logout()
    if (res) {
      localStorage.setItem('auth_user', JSON.stringify(initialAuthUserInfo))
      setAuthUser(initialAuthUserInfo)
      navigate('/auth/login/', {replace: true})
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left rounded-md">
        <div className='rounded-md'>
          <Menu.Button className="flex text-black items-center space-x-4">
            <div className='flex flex-col text-end'>
              <span className='text-base font-semibold'>{authUser.first_name} {authUser.last_name}</span>
            </div>
            <div className='h-9 w-9 rounded-full bg-black'></div>
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 mt-4 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none border-[1px] border-zinc-300">    
              <Menu.Item>
                {({ active } : { active : boolean }) => (
                  <Link to={`/profile`}>
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
                  <div className={`${active ? 'bg-zinc-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                      <div className={`w-1 ${active ? 'bg-red-500' : ''}`}></div>
                        <button className={`${active ? `font-normal text-red-500` : `font-normal`} my-[6px] w-full flex text-base`} onClick={() => handleLogout()}>
                            Wyloguj
                        </button>
                  </div> 
                )}
              </Menu.Item>
          </Menu.Items>
      </Menu>
  )
}

export const MainLayout = ({children} : MainLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const location = useLocation()

  const {authUser, setAuthUser} = useContext(AuthContext)

  useEffect(() => {
    const authenticatedUser: AuthUserInfo = JSON.parse(localStorage.getItem('auth_user') || "") 
    setAuthUser(authenticatedUser)
  }, [])
  
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