import * as React from 'react';
import { FieldBox, clsName } from '../../../components/FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Combobox } from '@headlessui/react';
import { TeacherEdition } from 'types';

interface IDropDown {
    title: string;
    values: any[];
    value: any;
    setValue: (v: any) => void;
}

export const DropDown = ({ title, values, value, setValue }: any) => {
    const [query, setQuery] = React.useState('');

    console.log('values', values);
    
    const filteredTeachers =
        query === ''
            ? values
            : values.filter((opt: TeacherEdition) => {
                console.log('opt', opt);
                
                const val: string = opt?.teacher.first_name + opt?.teacher.last_name;
                return val.toLowerCase().includes(query.toLowerCase())
            })

    console.log()

    return (
        <FieldBox title={title}>
            <Combobox value={value} onChange={(v) => setValue(v)}>
                <div className="relative">
                    <div className={'relative w-full rounded-lg border border-zinc-400 h-9 hover:border-blue-800 focus-within:outline-blue-800 focus-within:focus-visible:outline-blue-800 focus-visible:outline-blue-800'}>
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 bg-transparent rounded-lg focus-visible:outline-blue-800"
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={(option: TeacherEdition) => option ? option?.teacher.first_name + ' ' + option?.teacher.last_name : ''}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='w-fit z-10 absolute p-1 w-full overflow-auto rounded-lg shadow-xl bg-white'>
                        {filteredTeachers.map((option: TeacherEdition) => (
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
        </FieldBox>
    )
};

DropDown.displayName = 'DropDown';