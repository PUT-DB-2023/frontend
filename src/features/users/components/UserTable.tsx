import { Spinner } from 'components/Spinner'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { UserType } from 'types'
import { getStudents } from '../api/getStudents'
import { getUsers } from '../api/getUsers'
import { User } from '../types'
import { UserTableRow } from './UserTableRow'

export const UserTable = ( { data, } : any) => {
  // const usersQuery = useQuery(['users', type], () => getUsers(type))

  return (
    <div className='border-slate-300 border-[0.1rem] border-spacing-0 w-full overflow-y-auto border-collapse cp-0 box-border text-base text-slate-700'>
        <div className='p-0 border-slate-300 border-b-[1px] h-10 font-bold flex box-border'>
          <div className='p-0 border-slate-300 pl-2 basis-2/12 border-r-[1px] h-full flex items-center'>
            Imię
          </div>
          <div className='p-0 border-slate-300 pl-2 basis-3/12 border-r-[1px] h-full flex items-center'>
            Nazwisko
          </div>
          <div className='p-0 border-slate-300 pl-2 basis-4/12 border-r-[1px] h-full flex items-center'>
            E-mail
          </div>
          <div className='p-0 border-slate-300 pl-2 basis-2/12 border-r-[1px] h-full flex items-center'>
            Hasło
          </div>
          <div className='p-0 border-slate-300 pl-2 basis-2/12 h-full flex items-center'>
          </div>
        </div>
      { data.map((user: any) => {
        return (
            <UserTableRow user={ user } />
        )
      })}
    </div>
  )
}
