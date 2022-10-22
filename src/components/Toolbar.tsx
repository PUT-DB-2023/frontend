import { Listbox } from '@headlessui/react'
import { AdjustmentsIcon, FilterIcon, SearchCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { ChevronUpIcon, SortAscendingIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { FilterOptions, SortOptions } from 'types'

interface IToolbar {
    searchPlaceholder : string,
    sortOptions : SortOptions[],
    filterOptions? : FilterOptions // TODO
}

export const Toolbar = ({ searchPlaceholder, sortOptions } : IToolbar) => {
    const [sortBy, setSortBy] = useState(sortOptions[0])

    console.log(sortBy)

    return (
    <div className='flex w-full justify-end self-end'>
        <div className='flex-wrap-reverse lg:w-auto flex items-center gap-4'>
            <AdjustmentsIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/>
            <Listbox value={sortBy} onChange={setSortBy}>
                <div className="relative w-[232px]">
                    <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 rounded-md border border-zinc-400 flex px-1 justify-between items-center h-9 hover:border-zinc-500 focus:border-blue-800'>
                        <SortAscendingIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/>
                        <span className='flex justify-start w-full px-2'>
                            {sortBy.field}: {sortBy.asc ? "rosnąco" : "malejąco"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </Listbox.Button>
                    <Listbox.Options className='absolute py-1 w-full overflow-auto rounded-md shadow-md bg-white'>
                        {sortOptions.map((sortOption) => (
                            <Listbox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer'
                                key={sortOption.field + sortOption.asc}
                                value={sortOption}
                            >
                                {({ selected }) => (         
                                    <>                   
                                        <span className={selected ? `font-bold` : `font-normal`}>{sortOption.field}: {sortOption.asc ? "rosnąco" : "malejąco"}</span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                </Listbox.Options>
                </div>
            </Listbox>
            <div className='flex'>
                <input className='border border-zinc-400 rounded-l-md h-9 w-60 px-3 py-1 outline-offset-[-2px] outline-none border-r-0 focus:outline-blue-800 hover:border-zinc-500' placeholder={searchPlaceholder}></input>
                <div className='flex items-center justify-center px-[6px] w-8 bg-blue-800 rounded-r-md h-9 cursor-pointer'>
                    <SearchIcon className='h-5 w-auto text-white'></SearchIcon>
                </div>  
            </div>
        </div>
    </div>
    )
}
