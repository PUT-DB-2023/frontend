import * as React from 'react';

export const clsName = 'rounded-lg p-1 border border-zinc-400 hover:border-blue-800 focus-visible:outline-blue-800';
export const clsNameWrong = 'rounded-lg p-1 border border-red-400 hover:border-red-800 focus-visible:outline-red-800';


export const FieldBox = ({ title, children }: any) => {
    return (
        <div className='flex flex-col gap-1 relative'>
            {title ?? null}
            {children}
        </div>
    )
};

FieldBox.displayName = 'FieldBox';