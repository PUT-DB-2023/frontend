import { Button } from 'components/Button'
import React from 'react'
import { ButtonType } from 'types'

export const ServerInfo = ( { serverData } : {serverData : any} ) => {
    console.log(Object.keys(serverData));
    const fieldNames = {
        ip: 'Adres IP',
        port: "Port",
        provider: 'System',
        user: 'Użytkownik',
        password: 'Hasło',
        database: 'Nazwa bazy',
        date_created: 'Data utworzenia',
        active: 'Aktywny' 
    } 
    const hiddenFields = ['id', 'name']

    Object.keys(fieldNames).map((key : string) => console.log((fieldNames as any)[key], serverData[key]))
    
    return (
        <div className='flex w-full flex-wrap'>
            {Object.keys(fieldNames).map((key : string) => {
                return (
                    <div className='flex flex-col basis-1/2 md:basis-1/3 lg:basis-1/4 gap-2 p-4'>
                        <span className='text-black text-base font-semibold'> {(fieldNames as any)[key]} </span>
                        <span className='text-slate-600 text-base'> {serverData[key].toString()} </span>
                    </div>
                )
                })
            }
        </div>
    )
}
