import { Button } from 'components/Button'
import React from 'react'
import { ButtonType } from 'types'

export const ServerInfo = ( { serverData } : any ) => {
  return (
    <>
    <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-col p-2 gap-2'>
            <span className='text-black text-base font-semibold'> Adres </span>
            <span className='text-slate-600 text-base'> { serverData.ip } </span>
        </div>
        <div className='flex flex-col p-2 gap-2'>
            <span className='text-black text-base font-semibold'> Port </span>
            <span className='text-slate-600 text-base'> { serverData.port } </span>
        </div>
    </div> 
        
    <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-col p-2 gap-2'>
            <span className='text-black text-base font-semibold'> Data utworzenia </span>
            <span className='text-slate-600 text-base'> { serverData.date_created } </span>
        </div>
        <div className='flex flex-col p-2 gap-2'>
            <span className='text-black text-base font-semibold'> Aktywny </span>
            <span className='text-slate-600 text-base'> { serverData.active ? `Tak` : `Nie` } </span>
        </div>
    </div>
    </>
  )
}
