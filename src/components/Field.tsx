import * as React from 'react';
import { FieldBox, clsName } from './FieldBox';

export const Field = ({ title, value, setValue, type, pattern }: any) => {

    return (
        <FieldBox title={title}>
            <input type={type ? type : 'input'} value={value} onChange={(e) => setValue(e.target.value)}
                className={clsName} pattern={'/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'}/>
        </FieldBox>
    )
};

Field.displayName = 'Field';