import * as React from 'react';
import { FieldBox, clsName } from '../../../components/FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Listbox } from '@headlessui/react'
import { Combobox } from '@headlessui/react';
import { weekDays, WeekDay } from 'types';
import { getTeacher } from 'features/users/api/getTeacher';

interface IDropDown {
    title: string;
    values: any[];
    value: any;
    setValue: (v: any) => void;
}

export const DropDown = ({ title, values, value, setValue }: any) => {
    const [query, setQuery] = React.useState('');

    const filteredTeachers =
        query === ''
            ? values
            : values.filter((opt: any) => {
                // console.log(opt.teacher)
                const val: string = opt?.teacher.first_name + opt?.teacher.last_name;                
                return val.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <FieldBox title={title}>
            <Combobox value={value} onChange={(v) => setValue(v)}>
                <div className="relative">
                    <div className={'relative w-full rounded-lg border border-zinc-400 h-9 hover:border-blue-800 focus-within:outline-blue-800 focus-within:focus-visible:outline-blue-800 focus-visible:outline-blue-800'}>
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 bg-transparent rounded-lg focus-visible:outline-blue-800"
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={(option: any) => option.teacher ? option?.teacher.first_name + ' ' + option?.teacher.last_name : ''}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='w-fit z-10 absolute p-1 w-full overflow-auto rounded-lg shadow-xl bg-white'>
                        {filteredTeachers.map((option: any) => (
                            <Combobox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer rounded-lg'
                                key={option.id}
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={selected ? `font-bold` : `font-normal`}>{option?.teacher.first_name + ' ' + option?.teacher.last_name}</span>
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </div>
            </Combobox>
            {/* <Listbox value={value} onChange={(v) => setValue(v)}>
                <div className="rounded-lg border border-zinc-400 h-9 hover:border-blue-800 focus-within:outline-blue-800 focus-within:focus-visible:outline-blue-800">
                    <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 flex px-1 justify-between items-center h-9 rounded-lg focus-visible:outline-blue-800'>
                        <span className='flex justify-start w-full px-2'>
                            {value ? value?.first_name + ' ' + value.last_name : ''}
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
                                        <span className={selected ? `font-bold` : `font-normal`}>{option.first_name + ' ' + option.last_name}</span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox> */}
        </FieldBox>
    )
};

DropDown.displayName = 'DropDown';