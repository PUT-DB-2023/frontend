import React from 'react'

interface ContentProps {
    children: React.ReactNode;
};

export const ContentLayout = ({children} : ContentProps) => {
  return (
    <main className='w-full flex overflow-y-auto h-auto bg-zinc-100 lg:p-9 p-4 flex-wrap gap-9'>
      { children }
    </main>
  )
}