import * as React from 'react';

export const clsName = 'rounded-lg p-1 border border-zinc-400 hover:border-blue-800 focus-visible:border-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-1';
export const clsNameWrong = 'rounded-lg p-1 border-2 border-red-400 hover:border-red-800 focus-visible:border-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-1';
export const clsTextWrong = 'text-red-400 text-sm font-medium';


export const FieldBox = ({ title, children }: any) => {
    return (
        <div className='flex flex-col gap-1 relative'>
            {title ? <span className='font-semibold'>{title}</span> : null}
            {children}
        </div>
    )
};

FieldBox.displayName = 'FieldBox';