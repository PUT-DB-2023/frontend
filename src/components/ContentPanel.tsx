import React from 'react'
import { PanelType } from 'types';

interface ContentPanelProps {
    type: PanelType;
    children: React.ReactNode;
};

export const ContentPanel = ({type, children} : ContentPanelProps) => {
  return (
    <main className={`bg-white shadow-md rounded-md flex flex-auto p-9 ${
      type == PanelType.LARGE ?
          'basis-full flex justify-between' :
          type == PanelType.SMALL ?
          'basis-full lg:basis-1/3 h-[40rem] flex-col' : ''
  }`}>
      { children }
    </main>
  )
}