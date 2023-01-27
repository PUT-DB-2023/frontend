import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface IContentLayout {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: IContentLayout) => {
  return (
    <main className='w-full flex overflow-y-auto h-full bg-zinc-100 lg:p-9 p-4 flex-col gap-9'>
      {children}
    </main>
  )
}