import * as React from 'react';
import { FieldBox, clsName } from './FieldBox';

export const Field = ({ title, value, setValue }: any) => {

    return (
        <FieldBox title={title}>
            <input type='input' value={value} onChange={(e) => setValue(e.target.value)}
                className={clsName} />
        </FieldBox>
    )
};

Field.displayName = 'Field';