import { AdjustmentsIcon, FilterIcon, SearchCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { SortAscendingIcon } from '@heroicons/react/solid'
import React from 'react'

interface IToolbar {
    searchPlaceholder : string,
}

export const Toolbar = () => {
  return (
    <div className='flex w-full justify-end self-end'>
        <div className='flex-wrap-reverse lg:w-auto flex items-center gap-4'>
            <SortAscendingIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/>
            <AdjustmentsIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/>
            <div className='flex'>
                <input className='border border-zinc-400 rounded-l-md w-60 h-9 px-3 py-1 outline-offset-[-2px] outline-none border-r-0 focus:outline-blue-800' placeholder='Szukaj przedmiotu'></input>
                <div className='flex items-center justify-center px-2 bg-blue-800 rounded-r-md h-9'>
                    <SearchIcon className='h-6 w-auto text-white'></SearchIcon>
                </div>  
            </div>
        </div>
    </div>
  )
}