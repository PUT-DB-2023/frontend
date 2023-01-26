import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { Button } from 'components/Button'
import React from 'react'
import { ButtonType } from 'types'
import { Server } from '../types'

interface IServerInfo {
    serverData: Server;
}

export const ServerInfo = ({ serverData }: IServerInfo) => {
    const fieldNames = {
        host: 'Host',
        port: "Port",
        "dbms.name": 'System',
        user: 'Użytkownik',
        password: 'Hasło',
        database: 'Nazwa bazy',
        date_created: 'Data utworzenia',
        active: 'Aktywny'
    }

    return (
        <div className='flex w-full flex-wrap'>
            {Object.keys(fieldNames).map((key: string) => {
                let res = serverData as any;
                for (const val of key.split('.')) {
                    res = res?.[val];
                }
                return (
                    <div className='flex flex-col basis-1/2 md:basis-1/3 lg:basis-1/4 gap-2 p-4' key={key}>
                        <span className='text-black text-base font-semibold'> {(fieldNames as any)[key]} </span>
                        <span className='text-slate-600 text-base'> {res === true ? <CheckCircleIcon className='h-6 text-green-500'/> : res === false ? <XCircleIcon className='h-6 text-red-500'/> : res.toString()} </span>

                    </div>
                )
            })
            }
        </div>
    )
}
