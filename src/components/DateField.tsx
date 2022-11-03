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
                className={clsName}
                dateFormat={'dd.MM.yyyy'} 
                maxDate={maxDate}
                minDate={minDate}
                todayButton={'Dzisiaj'}/>
        </FieldBox>
    )
};

DateField.displayName = 'DateField';