import React from 'react'

interface ContentProps {
    title?: string;
    children: React.ReactNode;
};

export const ContentLayout = ({title, children} : ContentProps) => {

  return (
    <>
        <div className='w-full flex flex-1 flex-col bg-red bg-slate-100 p-12 overflow-y-scroll'>
          <h1 className='text-black text-3xl font-bold mb-24'>{title}</h1>
          {children}
        </div>
        
    </>
  )
}