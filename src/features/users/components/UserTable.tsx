import { Spinner } from 'components/Spinner'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { UserType } from 'types'
import { getStudents } from '../api/getStudents'
import { getUsers } from '../api/getUsers'
import { User } from '../types'
import { UserTableRow } from './UserTableRow'

interface UsersProps {
  type: UserType;
}

export const UserTable = ( { type } : UsersProps) => {
  const usersQuery = useQuery(['users', type], () => getUsers(type))

  console.log(usersQuery.data)

  if (usersQuery.isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <table className='border-slate-300 border-[0.1rem] border-spacing-0 w-full border-collapse cp-0 box-border text-base text-slate-700'>
      <tbody className='p-0'>
        <tr className='p-0 border-slate-300 border-[0.05rem] h-10 font-bold'>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
            Imię
          </td>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
            Nazwisko
          </td>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
            E-mail
          </td>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
            Hasło
          </td>
        </tr>
      { usersQuery.data.map((user: any) => {
        return (
            <UserTableRow user={ user } />
        )
      })}
      </tbody>
    </table>
  )
}
