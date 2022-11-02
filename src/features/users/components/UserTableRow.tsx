import { Button } from 'components/Button'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ButtonType } from 'types'

export const UserTableRow = ( { user } : any ) => {

  let navigate = useNavigate();

  const handleRowClick = (userId : any) => {
    navigate(`/users/${userId}`)
  }

  return (
      <div className='p-0 border-slate-300 border-b-[1px] last:border-b-0 h-10 font-base flex text-sm box-border hover:bg-zinc-100 transition-all'>
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
  )
}
