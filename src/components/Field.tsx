import * as React from 'react';
import { FieldBox, clsName, clsNameWrong } from './FieldBox';

export const Field = ({ title, value, setValue, type, pattern }: any) => {
    const [wrong, setWrong] = React.useState(false);

    React.useEffect(() => {
        if (pattern) {
            console.log(value)
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
            {/* <div className='absolute'>Błąd</div> */}
            <input type={type ? type : 'input'} value={value} onChange={(e) => setValue(e.target.value)}
                className={wrong ? clsNameWrong : clsName} />
        </FieldBox>
    )
};

Field.displayName = 'Field';