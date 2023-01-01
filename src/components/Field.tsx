import * as React from 'react';
import { clsName, clsNameWrong, clsTextWrong, FieldBox } from './FieldBox';

interface IField {
    title: string | undefined,
    value: any,
    setValue: (e: any) => void,
    type?: string,
    pattern?: string,
    forcePattern?: boolean,
    wrongText?: string,
    autoFocus?: boolean,
    multiline?: boolean,
    errorMsg?: string,
    setErrorMsg?: (e: string) => void,
    maxLenght?: number;
}

export const Field = ({ title, value, setValue, type, pattern, forcePattern, wrongText, autoFocus, multiline, errorMsg, setErrorMsg, maxLenght }: IField) => {
    const handleChange = React.useCallback((e: any) => {
        const val = e.target.value;
        if (pattern) {
            if (val === '') {
                setErrorMsg && setErrorMsg('');
            } else {
                const reg = new RegExp(pattern);
                if (reg.test(val)) {
                    setErrorMsg && setErrorMsg('');
                } else {
                    setErrorMsg && wrongText && setErrorMsg(wrongText);
                    if (forcePattern) {
                        setValue((prev: string) => prev);
                        return;
                    }
                }
            }
        } else {
            setErrorMsg && setErrorMsg('');
        }
        setValue(val)
    }, [pattern, value])

    return (
        <FieldBox title={title}>
            {multiline ?
                <textarea value={value} onChange={handleChange} rows={6} maxLength={maxLenght}
                    className={`${(errorMsg && errorMsg?.length > 0) ? clsNameWrong : clsName} rounded-md`} autoFocus={autoFocus} />
                :
                <input type={type ? type : 'input'} value={value} onChange={handleChange} maxLength={maxLenght}
                    className={(errorMsg && errorMsg?.length > 0) ? clsNameWrong : clsName} autoFocus={autoFocus} />}
            {errorMsg && errorMsg?.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
        </FieldBox>
    )
};

Field.displayName = 'Field';