import * as React from 'react';
import { FieldBox, clsName, clsNameWrong } from './FieldBox';
import { Tooltip } from '@mui/material';

export const Field = ({ title, value, setValue, type, pattern, wrongText }: any) => {
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
                <input type={type ? type : 'input'} value={value} onChange={(e) => setValue(e.target.value)}
                    className={wrong ? clsNameWrong : clsName} />
            </Tooltip>
        </FieldBox>
    )
};

Field.displayName = 'Field';