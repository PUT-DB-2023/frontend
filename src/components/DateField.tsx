import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { clsName, clsNameWrong, clsTextWrong, FieldBox } from './FieldBox';

interface IDateField {
    title: any;
    value: any; 
    setValue: any; 
    maxDate?: any;
    minDate?: any;
}

export const DateField = ({ title, value, setValue, maxDate, minDate }: IDateField) => {
    return (
        <FieldBox title={title}>
            <DatePicker
                onChange={(v: Date) => setValue(v)}
                selected={value}
                className={`${clsName} w-full bg-zinc-50 rounded-md`}
                dateFormat={'dd.MM.yyyy'} 
                maxDate={maxDate}
                minDate={minDate}
                todayButton={'Dzisiaj'}/>
        </FieldBox>
    )
};

DateField.displayName = 'DateField';

interface IYearField {
    title: any;
    value: any;
    setValue: any;
    autoFocus: any;
    minYear?: any;
    maxYear?: any;
    errorMsg: any;
    setErrorMsg: any;
}

export const YearField = ({ title, value, setValue, autoFocus, minYear, maxYear, errorMsg, setErrorMsg }: IYearField) => {
    return (
        <FieldBox title={title}>
            <DatePicker
                onChange={(v: Date) => {setErrorMsg && setErrorMsg(''); setValue(v)}}
                selected={value}
                className={`${(errorMsg && errorMsg?.length > 0) ? clsNameWrong : clsName} w-full bg-zinc-50 rounded-md`}
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