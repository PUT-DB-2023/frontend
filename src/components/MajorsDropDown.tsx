import { Listbox } from '@headlessui/react';
import { Major } from 'types';
import "react-datepicker/dist/react-datepicker.css";
import { IDropDownSingle } from 'types';
import { FieldBox, clsTextWrong, clsName, clsNameWrong } from './FieldBox';

export const MajorsDropDown = ({ title, values, value, setValue, errorMsg, setErrorMsg }: IDropDownSingle<Major>) => {
    return (
        <FieldBox title={title}>
            <Listbox value={value} onChange={(v) => {setErrorMsg && setErrorMsg(''); setValue(v)}}>
                <div className={`bg-zinc-50 h-9 ${errorMsg ? clsNameWrong : clsName}`}>
                    <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 flex px-1 justify-between items-center h-full rounded-lg focus-visible:outline-blue-800'>
                        <span className='flex justify-start w-full px-2'>
                            {value?.name}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </Listbox.Button>
                    <Listbox.Options className='z-10 relative mt-2 w-full overflow-auto rounded-md shadow-md bg-white border-[1px] border-zinc-300 max-h-56'>
                        {values.map((option: Major) => (
                            <Listbox.Option className='cursor-pointer'
                                key={option.id}
                                value={option}
                            >
                                {({ selected }) => (
                                    <div className={`${selected ? 'bg-blue-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-2 w-full`}>
                                        <div className={`w-1 ${selected ? 'bg-blue-600' : ''}`}></div>
                                        <span className={`${selected ? `font-normal text-blue-600` : `font-normal`} my-[6px]`}>{option.name}</span>
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
            {errorMsg && errorMsg.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
        </FieldBox>
    )
};

MajorsDropDown.displayName = 'MajorsDropDown';