import { Spinner } from 'components/Spinner'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getStudents } from '../api/getStudents'
import { User } from '../types'

export const UserTable = () => {
  const usersQuery = useQuery(['students'], getStudents)

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
        </tr>
      { usersQuery.data.map((user: any) => {
        return (
            <tr className='p-0 border-slate-300 border-[0.05rem] h-10'>
              {/* <Link to={`/users/${user.id}`}> */}
              <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
                { user.first_name }
              </td>
              <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
                { user.last_name }
              </td>
              <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
                { user.email }
              </td>
              {/* </Link> */}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}
