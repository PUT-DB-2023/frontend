import React from 'react'

interface ProfileInfoProps {
  name: string;
  role: string;
  image? : string;
}

const ProfileInfo = ({name, role} : ProfileInfoProps) => {
  return (
    <div className='flex text-black items-center space-x-4'>
      <div className='flex flex-col'>
        <span className='text-base font-semibold'>{name}</span>
        <span className='text-sm'>{role}</span>
      </div>
      
      <div className='h-9 w-9 rounded-full bg-black'></div>
    </div>
  )
}

export const TopBar = () => {
  return (
    <div className='w-full h-16 bg-white shadow-md flex text-base text-black z-10 items-center px-12 justify-between'>
        <span>Przedmioty</span>
        <ProfileInfo name='Bartosz Bębel' role='Dydaktyk'/>
    </div>
  )
}