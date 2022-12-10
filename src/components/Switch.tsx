import * as React from 'react';
import { FieldBox, clsName } from './FieldBox';
import "react-datepicker/dist/react-datepicker.css";
import { Listbox } from '@headlessui/react'
import { weekDays, WeekDay } from 'types';


export const Switch = ({ title, value, setValue, leftText, rightText }: any) => {
    return (
        <FieldBox title={title}>
            <div className='flex relative gap-2'>
                <div>{leftText}</div>
                <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={value} onChange={() => setValue(!value)}/>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-800"></div>
                </label>
                <div>{rightText}</div>
            </div>
        </FieldBox>
    )
};

Switch.displayName = 'Switch';