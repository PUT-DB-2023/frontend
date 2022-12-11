import * as React from 'react';
import { FieldBox, clsName, clsNameWrong, clsTextWrong } from './FieldBox';

interface IField {
    title: string | undefined,
    value: any,
    setValue: (e: any) => void,
    type?: string,
    pattern?: string,
    wrongText?: string,
    autoFocus?: boolean,
    multiline?: boolean,
    errorMsg?: string,
    setErrorMsg?: (e: string) => void,
}

export const Field = ({ title, value, setValue, type, pattern, wrongText, autoFocus, multiline, errorMsg, setErrorMsg }: IField) => {
    const handleChange = React.useCallback((e: any) => {
        const val = e.target.value;
        if (pattern) {
            if (val === '') {
                setErrorMsg && setErrorMsg('');
            } else {
                const reg = new RegExp(pattern);
                reg.test(val) ? setErrorMsg && setErrorMsg('') : setErrorMsg && wrongText && setErrorMsg(wrongText);
            }
        } else {
            setErrorMsg && setErrorMsg('');
        }
        setValue(val)
    }, [pattern])

    return (
        <FieldBox title={title}>
            {multiline ?
                <textarea value={value} onChange={handleChange}
                    className={(errorMsg && errorMsg?.length > 0) ? clsNameWrong : clsName} autoFocus={autoFocus} />
                :
                <input type={type ? type : 'input'} value={value} onChange={handleChange}
                    className={(errorMsg && errorMsg?.length > 0) ? clsNameWrong : clsName} autoFocus={autoFocus} />}
            {errorMsg && errorMsg?.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
        </FieldBox>
    )
};

Field.displayName = 'Field';