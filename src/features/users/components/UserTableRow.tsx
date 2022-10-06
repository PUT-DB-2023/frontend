import { Button } from 'components/Button'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ButtonType } from 'types'

export const UserTableRow = ( { user } : any ) => {

  let navigate = useNavigate();

  const handleRowClick = (userId : any) => {
    console.log(userId)
    navigate(`/users/${userId}`)
  }

  return (
    // <Link className='' to={`/users/${user.id}`}>
      <tr className='p-0 border-slate-300 border-[0.05rem] h-10 hover: cursor-pointer'>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
            { user.first_name }
          </td>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
            { user.last_name }
          </td>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
            { user.email }
          </td>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
            { user.password.split('').map((x : any) => '*') }
          </td>
          <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
            <Link to={'/'}><Button type={ButtonType.TEXT_WARNING} text='Resetuj Hasło' /></Link>
          </td>
      </tr>
    // </Link>  
  )
}
