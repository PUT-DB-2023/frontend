import * as React from 'react';

export const clsName = 'rounded p-1 border border-blue-800 focus-visible:outline-blue-800';

export const FieldBox = ({ title, children }: any) => {
    return (
        <div className='flex flex-col gap-1'>
            {title ?? null}
            {children}
        </div>
    )
};

FieldBox.displayName = 'FieldBox';