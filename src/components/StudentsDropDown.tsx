import * as React from 'react';
import { FieldBox, clsName } from './FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Combobox } from '@headlessui/react';

export const StudentsDropDown = ({ title, values, value, setValue }: any) => {
    const [query, setQuery] = React.useState('');

    const filteredStudents =
        query === ''
            ? values
            : values.filter((opt: any) => {
                const val: string = opt?.first_name + opt?.last_name + opt?.student_id;
                return val.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <FieldBox title={title}>
            <Combobox value={value} onChange={(v) => setValue(v)} multiple>
                <div className="relative">
                    <div className={'relative w-full rounded-lg border border-zinc-400 hover:border-blue-800 focus-within:outline-blue-800 focus-within:focus-visible:outline-blue-800 focus-visible:outline-blue-800'}>
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 bg-transparent rounded-lg focus-visible:outline-blue-800"
                            onChange={(event) => {
                                const val = event.target.value.split(',').at(-1);
                                setQuery(val ? val.trim() : '')
                            }}
                            displayValue={(options: any) => options ? options?.map((option: any) => option ? option?.first_name + ' ' + option?.last_name + ' - ' + option?.student_id: '').join(', ') : ''}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='z-10 p-1 w-full overflow-auto rounded-lg shadow-xl bg-white'>
                        {filteredStudents?.map((option: any) => (
                            <Combobox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer rounded-lg'
                                key={option.id}
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={selected ? `font-bold` : `font-normal`}>{option?.first_name + ' ' + option?.last_name + ' - ' + option?.student_id}</span>
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

StudentsDropDown.displayName = 'StudentsDropDown';