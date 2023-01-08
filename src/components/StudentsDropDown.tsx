import * as React from 'react';
import { FieldBox, clsName, clsNameWrong, clsTextWrong } from './FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Combobox } from '@headlessui/react';
import { useClickOutside } from 'hooks/useClickOutside';
import { IDropDownMulti } from 'types';
import { Student } from 'features/users';

export const StudentsDropDown = ({ title, values, value, setValue, errorMsg, setErrorMsg }: IDropDownMulti<Student>) => {
    const [query, setQuery] = React.useState('');
    const ref = useClickOutside(() => setQuery(''))

    const filteredStudents = React.useMemo(() => {
        return query === ''
        ? values
        : values.filter((opt: any) => {
            const val: string = `${opt?.user.first_name} ${opt?.last_name} - ${opt?.student_id}`;
            return val.toLowerCase().includes(query.toLowerCase())
        })
    }, [query, values])

    return (
        <FieldBox title={title}>
            <Combobox value={value} onChange={(v: Student[]) => {setErrorMsg && setErrorMsg(''); setValue(v)}} multiple >
                {({open}) => (
                <div className="relative" ref={ref}>
                    <div className={`relative bg-zinc-50 w-full `}>
                        <Combobox.Input
                            className={`w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-transparent focus-visible:outline-none ${errorMsg ? clsNameWrong : clsName}`}
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={() => open ? query : ''}
                            placeholder={`Wybrano ${value && value.length} studentów`}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='z-10 absolute mt-2 w-full overflow-auto rounded-md shadow-md bg-white border-[1px] border-zinc-300 max-h-56'>
                        {filteredStudents?.map((option: Student) => (
                            <Combobox.Option className='cursor-pointer'
                                key={option.id}
                                value={option}
                            >
                                {({ selected, active }) => (         
                                        <>   
                                        <div className={`${selected ? 'bg-blue-100' : `hover:bg-zinc-100 [&>div]:hover:bg-blue-600 ${active ? '[&>div]:bg-blue-600 bg-zinc-100' : ''}`} flex gap-7 w-full`}>
                                            <div className={`w-1 ${selected ? 'bg-blue-600' : ''}`}></div>
                                            <span className={`${selected ? `font-normal text-blue-600` : `font-normal`} my-[6px]`}>{option?.user.first_name + ' ' + option?.user.last_name + ' - ' + option?.student_id}</span>
                                        </div>                
                                        </> 
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </div>)}
            </Combobox>
            {errorMsg && errorMsg.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
        </FieldBox>
    )
};

StudentsDropDown.displayName = 'StudentsDropDown';