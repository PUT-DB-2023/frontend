import React from 'react'
import { useLocation } from 'react-router-dom';

interface ContentProps {
    title?: string;
    header?: React.ReactNode;
    children: React.ReactNode;
};

export const ContentLayout = ({title, header, children} : ContentProps) => {
  return (
    <main className='flex-1 overflow-y-auto bg-slate-100'>
      { header }
        <div className='w-full flex flex-1 flex-col bg-slate-100 p-12'>
          { header ? <></> : <h1 className='text-black text-3xl font-bold mb-24'>{title}</h1> }
          { children }
        </div>
    </main>
  )
}