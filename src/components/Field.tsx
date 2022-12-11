import * as React from 'react';
import { FieldBox, clsName, clsNameWrong } from './FieldBox';
import { Tooltip } from '@mui/material';

interface IField {
    title: string | undefined,
    value: any;
    setValue: any,
    type?: string | undefined,
    pattern?: string | undefined,
    wrongText?: string | undefined,
    autoFocus?: boolean | undefined,
    multiline?: boolean | undefined,
}

export const Field = ({ title, value, setValue, type, pattern, wrongText, autoFocus, multiline }: IField) => {
    const [wrong, setWrong] = React.useState(false);

    React.useEffect(() => {
        if (pattern) {
            if (value === '') {
                setWrong(false)
            } else {
                const reg = new RegExp(pattern);
                reg.test(value) ? setWrong(false) : setWrong(true);
            }
        }
    }, [pattern, value])

    return (
        <FieldBox title={title}>
            <Tooltip open={wrong} title={wrongText} placement="top" arrow>
                {multiline ?
                    <textarea value={value} onChange={(e) => setValue(e.target.value)}
                        className={wrong ? clsNameWrong : clsName} autoFocus={autoFocus} />
                    :
                    <input type={type ? type : 'input'} value={value} onChange={(e) => setValue(e.target.value)}
                        className={wrong ? clsNameWrong : clsName} autoFocus={autoFocus} />}
            </Tooltip>
        </FieldBox>
    )
};

Field.displayName = 'Field';