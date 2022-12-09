import * as React from 'react';
import { FieldBox, clsName } from './FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Listbox } from '@headlessui/react'
import { IDropDown } from './ServersDropDown';

export const SemesterDropDown = ({ title, values, value, setValue }: IDropDown) => {

    console.log(values);
    console.log(value);
    

    return (
        <FieldBox title={title}>
            <Listbox value={value} onChange={(v) => setValue(v)}>
                <div className="rounded-lg border border-zinc-400 h-9 hover:border-blue-800 focus-within:outline-blue-800 focus-within:focus-visible:outline-blue-800 focus-visible:outline-blue-800">
                    <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 flex px-1 justify-between items-center h-full rounded-lg focus-visible:outline-blue-800'>
                        <span className='flex justify-start w-full px-2'>
                            {value.start_year}/{parseInt(value.start_year)+1} - {(value.winter ? 'Zima' : 'Lato')}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </Listbox.Button>
                    <Listbox.Options className='w-fit z-10 absolute p-1 w-full overflow-auto rounded-lg shadow-xl bg-white'>
                        {values.map((option: any) => (
                            <Listbox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer rounded-lg'
                                key={option.id}
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={selected ? `font-bold` : `font-normal`}>{option.start_year}/{parseInt(option.start_year)+1} - {(option.winter ? 'Zima' : 'Lato')}</span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </FieldBox>
    )
};

SemesterDropDown.displayName = 'SemesterDropDown';