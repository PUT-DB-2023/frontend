import * as React from 'react';

export const clsName = 'rounded-lg p-1 border border-zinc-400 hover:border-blue-800 focus-visible:outline-blue-800';

export const FieldBox = ({ title, children }: any) => {
    return (
        <div className='flex flex-col gap-1 w-96'>
            {title ?? null}
            {children}
        </div>
    )
};

FieldBox.displayName = 'FieldBox';