import { Button } from 'components/Button'
import React from 'react'
import { ButtonType } from 'types'

export const UserTableRow = ( { user } : any ) => {

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
        <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
          { user.password.split('').map((x : any) => '*') }
        </td>
        <td className='p-0 border-slate-300 border-[0.05rem] pl-2'>
          <Button type={ButtonType.TEXT_WARNING} text='Resetuj Hasło' />
        </td>
        {/* </Link> */}
    </tr>
  )
}
