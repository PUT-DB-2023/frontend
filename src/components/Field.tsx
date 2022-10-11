import * as React from 'react';

export const Field = ({ title, value, setValue }: any) => {

    return (
        <div className='flex flex-col gap-1'>
            {title ?? null}
            <input type='input' value={value} onChange={(e) => setValue(e.target.value)}
                className='rounded p-1 border border-blue-800 focus-visible:outline-blue-800' />
        </div>
    )
};

Field.displayName = 'Field';