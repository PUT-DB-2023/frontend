import * as React from 'react';
import { FieldBox, clsName, clsNameWrong } from './FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Combobox } from '@headlessui/react';
import { useClickOutside } from 'hooks/useClickOutside';

export const StudentsDropDown = ({ title, values, value, setValue, style, errorMsg, setErrorMsg }: any) => {
    const [query, setQuery] = React.useState('');
    const ref = useClickOutside(() => setQuery(''))

    const filteredStudents = React.useMemo(() => {
        return query === ''
        ? values
        : values.filter((opt: any) => {
            const val: string = opt?.first_name + opt?.last_name + opt?.student_id;
            return val.toLowerCase().includes(query.toLowerCase())
        })
    }, [query, values])

    return (
        <FieldBox title={title}>
            <Combobox value={value} onChange={(v) => {setErrorMsg && setErrorMsg(''); setValue(v)}} multiple >
                {({open}) => (
                <div className="relative mb-40" ref={ref}>
                    <div className={`relative bg-zinc-50 w-full rounded-md ${errorMsg ? clsNameWrong : clsName}`}>
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-transparent focus-visible:outline-none"
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={() => open ? query : ''}
                            placeholder={`Wybrano ${value.length} studentów`}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='z-10 absolute mt-2 w-full overflow-auto rounded-md shadow-md bg-white border-[1px] border-zinc-300 max-h-56'>
                        {filteredStudents?.map((option: any) => (
                            <Combobox.Option className='cursor-pointer'
                                key={option.id}
                                value={option}
                            >
                                {({ selected }) => (         
                                        <>   
                                        <div className={`${selected ? 'bg-blue-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                                            <div className={`w-1 ${selected ? 'bg-blue-600' : ''}`}></div>
                                            <span className={`${selected ? `font-normal text-blue-600` : `font-normal`} my-[6px]`}>{option?.first_name + ' ' + option?.last_name + ' - ' + option?.student_id}</span>
                                        </div>                
                                        </> 
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </div>)}
            </Combobox>
        </FieldBox>
    )
};

StudentsDropDown.displayName = 'StudentsDropDown';