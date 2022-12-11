import * as React from 'react';
import { FieldBox, clsName, clsTextWrong, clsNameWrong } from './FieldBox';
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

export const YearField = ({ title, value, setValue, autoFocus, minYear, maxYear, errorMsg, setErrorMsg }: any) => {
    return (
        <FieldBox title={title}>
            <DatePicker
                onChange={(v: Date) => {setErrorMsg && setErrorMsg(''); setValue(v)}}
                selected={value}
                className={`${(errorMsg && errorMsg?.length > 0) ? clsNameWrong : clsName} w-full`}
                dateFormat={'yyyy'} 
                showYearPicker
                autoFocus={autoFocus}
                minDate={new Date(minYear)}
                maxDate={new Date(maxYear)}/>
            {errorMsg && errorMsg?.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
        </FieldBox>
    )
};

YearField.displayName = 'YearField';