import { Combobox } from '@headlessui/react';
import { Server } from 'features/servers';
import { useClickOutside } from 'hooks/useClickOutside';
import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { IDropDownMulti } from 'types';
import { FieldBox } from './FieldBox';

export const ServersDropDown = ({ title, values, value, setValue }: IDropDownMulti<Server>) => {
    const [query, setQuery] = React.useState('');
    const ref = useClickOutside(() => setQuery(''))

    const filteredServers =
        query === ''
            ? values
            : values.filter((opt: Server) => {
                const val: string = opt?.name;
                
                return val.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <FieldBox title={title}>
            <Combobox value={value} onChange={(v: Server[]) => setValue(v)} multiple>
                <div className="relative">
                    <div className={'relative w-full bg-zinc-50 rounded-md border border-zinc-400 h-9 hover:zinc-blue-600 focus-within:outline-blue-800 focus-within:focus-visible:outline-blue-800 focus-visible:outline-blue-800'} ref={ref}>
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 bg-transparent rounded-md focus-visible:outline-blue-800"
                            onChange={(event) => {
                                const val = event.target.value.split(',').at(-1);
                                setQuery(val ? val.trim() : '')
                            }}
                            displayValue={(options: Server[]) => options ? options?.map((option: Server) => option ? option?.name : '').join(', ') : ''}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='z-10 absolute mt-2 w-full overflow-auto rounded-md shadow-md bg-white border-[1px] border-zinc-300 max-h-56'>
                        {filteredServers?.map((option: Server) => (
                            <Combobox.Option className='cursor-pointer'
                                key={option.id}
                                value={option}
                            >
                                {({ selected }) => (         
                                        <>   
                                        <div className={`${selected ? 'bg-blue-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                                            <div className={`w-1 ${selected ? 'bg-blue-600' : ''}`}></div>
                                            <span className={`${selected ? `font-normal text-blue-600` : `font-normal`} my-[6px]`}>{option.name}</span>
                                        </div>                
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

ServersDropDown.displayName = 'ServersDropDown';