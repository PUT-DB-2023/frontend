import * as React from 'react';
import { FieldBox, clsName } from './FieldBox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateField = ({ title, value, setValue, maxDate, minDate }: any) => {
    return (
        <FieldBox title={title}>
            <DatePicker
                onChange={(v: Date) => setValue(v)}
                selected={value}
                className={`${clsName} w-full`}
                dateFormat={'dd.MM.yyyy'} 
                maxDate={maxDate}
                minDate={minDate}
                todayButton={'Dzisiaj'}/>
        </FieldBox>
    )
};

DateField.displayName = 'DateField';

export const YearField = ({ title, value, setValue, autoFocus, minYear, maxYear }: any) => {
    return (
        <FieldBox title={title}>
            <DatePicker
                onChange={(v: Date) => setValue(v)}
                selected={value}
                className={`${clsName} w-full`}
                dateFormat={'yyyy'} 
                showYearPicker
                autoFocus={autoFocus}
                minDate={new Date(minYear)}
                maxDate={new Date(maxYear)}/>
        </FieldBox>
    )
};

YearField.displayName = 'YearField';