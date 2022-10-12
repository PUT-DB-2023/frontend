import React from 'react'
import { PanelType } from 'types';

interface ContentPanelProps {
    type: PanelType;
    children: React.ReactNode;
};

export const ContentPanel = ({type, children} : ContentPanelProps) => {
  return (
    <main className={`bg-white shadow-md rounded-md flex flex-auto lg:p-9 p-6 ${
      type == PanelType.LARGE ?
          'basis-full flex justify-between flex-col lg:flex-row' :
          type == PanelType.SMALL ?
          'basis-full lg:basis-1/3 lg:h-[40rem] h-[24rem] flex-col' : ''
  }`}>
      { children }
    </main>
  )
}