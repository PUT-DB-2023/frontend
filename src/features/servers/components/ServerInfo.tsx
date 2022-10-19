import { Button } from 'components/Button'
import React from 'react'
import { ButtonType } from 'types'

export const ServerInfo = ( { serverData } : any ) => {
  return (
    <>
    <div className='flex w-full flex-wrap'>
        <div className='flex flex-col basis-1/2 lg:basis-1/3 gap-2'>
            <span className='text-black text-base font-semibold'> System </span>
            <span className='text-slate-600 text-base'> { serverData.provider } </span>
        </div>
        <div className='flex flex-col basis-1/2 lg:basis-1/3 gap-2'>
            <span className='text-black text-base font-semibold'> Adres </span>
            <span className='text-slate-600 text-base'> { serverData.ip } </span>
        </div>
        <div className='flex flex-col basis-1/2 lg:basis-1/3 gap-2'>
            <span className='text-black text-base font-semibold'> Port </span>
            <span className='text-slate-600 text-base'> { serverData.port } </span>
        </div>
    </div>

    <div className='flex w-full flex-wrap'>
        <div className='flex flex-col basis-1/2 lg:basis-1/3 gap-2'>
            <span className='text-black text-base font-semibold'> Użytkownik </span>
            <span className='text-slate-600 text-base'> { serverData.user } </span>
        </div>
        <div className='flex flex-col basis-1/2 lg:basis-1/3 gap-2'>
            <span className='text-black text-base font-semibold'> Hasło </span>
            <span className='text-slate-600 text-base'> { serverData.password } </span>
        </div>
        <div className='flex flex-col basis-1/2 lg:basis-1/3 gap-2'>
            <span className='text-black text-base font-semibold'> Data utworzenia </span>
            <span className='text-slate-600 text-base'> { serverData.date_created } </span>
        </div>
    </div>
        
    <div className='flex w-full flex-wrap'>
        <div className='flex flex-col basis-1/2 lg:basis-1/3 gap-2'>
            <span className='text-black text-base font-semibold'> Aktywny </span>
            <span className='text-slate-600 text-base'> { serverData.active ? `Tak` : `Nie` } </span>
        </div>
    </div>
    </>
  )
}
