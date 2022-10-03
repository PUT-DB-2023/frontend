import React from 'react'

interface ContentProps {
    children: React.ReactNode;
};

export const ContentLayout = ({children} : ContentProps) => {
  return (
    <main className='flex overflow-y-auto h-auto bg-slate-100 p-9 flex-wrap gap-9'>
      {/* { header } */}
        {/* <div className='w-full flex flex-1 flex-col mt-9 flex-wrap'> */}
          {/* { header ? <></> : <h1 className='text-black text-3xl font-bold mb-24'>{title}</h1> } */}
          { children }
        {/* </div> */}
    </main>
  )
}