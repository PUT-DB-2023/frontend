import { Listbox } from '@headlessui/react'
import { AdjustmentsIcon, FilterIcon, SearchCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { ChevronUpIcon, SortAscendingIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { FilterOptions, SortOptions } from 'types'

interface IToolbar {
    sort : boolean,
    filter: boolean,
    search : boolean,
    searchPlaceholder?: string,
    sortOptions? : SortOptions[],
    filterOptions? : FilterOptions, // TODO
    sortVal?: any,
    sortSet?: (v: any) => void,
    searchVal?: string;
    searchSet?: (v: any) => void,
}

export const Toolbar = ({ sort, filter, search, searchPlaceholder, sortOptions, sortVal, sortSet, searchVal, searchSet } : IToolbar) => {
    const sortBy = sortVal;
    const setSortBy = sortSet;

    return (
    <div className='flex w-full justify-end self-end'>
        <div className='flex-wrap-reverse lg:w-auto flex items-center gap-4'>
            {filter ? <AdjustmentsIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/> : null}
            {sort && sortOptions && sortBy && setSortBy ? <Listbox value={sortBy} onChange={setSortBy}>
                <div className="relative w-[232px]">
                    <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 rounded-lg border border-zinc-400 flex px-1 justify-between items-center h-9 hover:border-zinc-500 focus:border-blue-800'>
                        <SortAscendingIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/>
                        <span className='flex justify-start w-full px-2'>
                            {sortBy.name}: {sortBy.asc ? "rosnąco" : "malejąco"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </Listbox.Button>
                    <Listbox.Options className='absolute p-1 w-full overflow-auto rounded-lg shadow-xl bg-white'>
                        {sortOptions.map((sortOption) => (
                            <Listbox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer rounded-lg'
                                key={sortOption.field + sortOption.asc}
                                value={sortOption}
                            >
                                {({ selected }) => (         
                                    <>                   
                                        <span className={selected ? `font-bold` : `font-normal`}>{sortOption.name}: {sortOption.asc ? "rosnąco" : "malejąco"}</span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                </Listbox.Options>
                </div>
            </Listbox> : null}
            {search ? <div className='flex'>
                <input className='border border-zinc-400 rounded-l-md h-9 w-60 px-3 py-1 outline-offset-[-2px] outline-none border-r-0 focus:outline-blue-800 hover:border-zinc-500'
                    placeholder={searchPlaceholder}
                    value={searchVal}
                    onChange={(v) => searchSet?.(v.target.value)}
                />
                <div className='flex items-center justify-center px-[6px] w-8 bg-blue-800 rounded-r-md h-9 cursor-pointer'>
                    <SearchIcon className='h-5 w-auto text-white'></SearchIcon>
                </div>  
            </div> : null}
        </div>
    </div>
    )
}
