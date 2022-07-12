import React from 'react'
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';

type MainLayoutProps = {
  children?: React.ReactNode;
}

export const MainLayout = ({children} : MainLayoutProps) => {
  return (
    <div className='w-screen h-screen flex'>
        <SideBar></SideBar>
        <div className='flex flex-col flex-1'>
            <TopBar></TopBar>
            {children}
        </div>
    </div>
  )
}