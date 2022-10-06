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
      // <tr className='p-0 border-slate-300 border-[0.05rem] h-10 hover: cursor-pointer'>
      //     <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
      //       { user.first_name }
      //     </td>
      //     <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
      //       { user.last_name }
      //     </td>
      //     <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
      //       { user.email }
      //     </td>
      //     <td className='p-0 border-slate-300 border-[0.05rem] pl-2' onClick={ () => handleRowClick(user.id)}>
      //       { user.password.split('').map((x : any) => '*') }
      //     </td>
      //     <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
      //       <Link to={'/'}><Button type={ButtonType.TEXT_WARNING} text='Resetuj Hasło' /></Link>
      //     </td>
      // </tr>
      <div className='p-0 border-slate-300 border-b-[1px] last:border-b-0 h-10 font-base flex text-sm box-border'>
        <Link to={`/users/${user.id}`} className='p-0 border-slate-300 pl-2 basis-2/12 border-r-[1px] h-full flex items-center'>
          { user.first_name }
        </Link>
        <Link to={`/users/${user.id}`} className='p-0 border-slate-300 pl-2 basis-3/12 border-r-[1px] h-full flex items-center'>
          { user.last_name }
        </Link>
        <Link to={`/users/${user.id}`} className='p-0 border-slate-300 pl-2 basis-4/12 border-r-[1px] h-full flex items-center'>
          { user.email }
        </Link>
        <Link to={`/users/${user.id}`} className='p-0 border-slate-300 pl-2 basis-2/12 border-r-[1px] h-full flex items-center'>
          { user.password.split('').map((x : any) => '*') }
        </Link>
        <div className='p-0 border-slate-300 pl-2 basis-2/12 h-full flex items-center'>
        <Button type={ButtonType.TEXT_WARNING} text='Resetuj Hasło' />
        </div>
    </div>
    // </Link>  
  )
}
