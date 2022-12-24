import { Button } from 'components/Button'
import React from 'react'
import { ButtonType } from 'types'
import { Admin, Student, Teacher, User } from '../types'

interface IUserInfo {
    userData : User;
}

export const UserInfo = ({ userData } : IUserInfo) => {
  return (
    <>
    <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-col p-2 gap-2'>
            <span className='text-black text-base font-semibold'> Imię </span>
            <span className='text-slate-600 text-base'> { userData.first_name } </span>
        </div>
        <div className='flex flex-col p-2 gap-2'>
            <span className='text-black text-base font-semibold'> Nazwisko </span>
            <span className='text-slate-600 text-base'> { userData.last_name } </span>
        </div>
    </div> 
        
    <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-col p-2 gap-2'>
            <span className='text-black text-base font-semibold'> E-mail </span>
            <span className='text-slate-600 text-base'> { userData.email } </span>
        </div>
    </div> 
    </>
  )
}
 