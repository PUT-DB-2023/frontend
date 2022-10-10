import * as React from 'react';

export const Field = ({ title, value, setValue }: any) => {

    return (
        <>
            {title ?? null}
            <input type='input' value={value} onChange={(e)=>setValue(e.target.value)}/>
        </>
    )
};

Field.displayName = 'Field';