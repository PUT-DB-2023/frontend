import * as React from 'react';
import { FieldBox, clsName, clsNameWrong, clsTextWrong } from '../../../components/FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Combobox } from '@headlessui/react';
import { TeacherEdition } from 'types';
import { useClickOutside } from 'hooks/useClickOutside';

interface IDropDown {
    title: string;
    values: any[];
    value: any;
    setValue: (v: any) => void;
    errorMsg?: string;
    setErrorMsg?: (e: string) => void;
}

export const DropDown = ({ title, values, value, setValue, errorMsg, setErrorMsg }: IDropDown) => {
    const [query, setQuery] = React.useState('');
    const ref = useClickOutside(() => setQuery(''))

    const filteredTeachers =
        query === ''
            ? values
            : values.filter((opt: TeacherEdition) => {
                const val: string = `${opt?.teacher.user.first_name} ${opt?.teacher.user.last_name}`;
                return val.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <FieldBox title={title}>
            <Combobox value={value} onChange={(v) => { setErrorMsg && setErrorMsg(''); setValue(v) }}>
                <div className="relative">
                    <div className={`relative bg-zinc-50 w-full ${(errorMsg && errorMsg?.length > 0) ? clsNameWrong : clsName}`} ref={ref}>
                        <Combobox.Input
                            className={`w-full border-none py-[3px] pl-3 pr-10 leading-5 text-gray-900 bg-transparent focus-visible:outline-none`}
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={(option: TeacherEdition) => option ? option?.teacher.user.first_name + ' ' + option?.teacher.user.last_name : ''}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='z-10 absolute mt-2 w-full overflow-auto rounded-md shadow-md bg-white border-[1px] border-zinc-300 max-h-56'>
                        {filteredTeachers.map((option: TeacherEdition) => (
                            <Combobox.Option className='cursor-pointer'
                                key={option.id}
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <div className={`${selected ? 'bg-blue-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                                            <div className={`w-1 ${selected ? 'bg-blue-600' : ''}`}></div>
                                            <span className={`${selected ? `font-normal text-blue-600` : `font-normal`} my-[6px]`}>{option?.teacher.user.first_name + ' ' + option?.teacher.user.last_name}</span>
                                        </div>
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </div>
            </Combobox>
            {(errorMsg && errorMsg?.length > 0) && <span className={clsTextWrong}>{errorMsg}</span>}
        </FieldBox>
    )
};

DropDown.displayName = 'DropDown';