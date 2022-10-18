import React from 'react'
import { PanelType } from 'types';

interface ContentPanelProps {
    type: PanelType;
    children: React.ReactNode;
};

export const ContentPanel = ({type, children} : ContentPanelProps) => {
  return (
    <main className={`bg-white shadow-md rounded-md flex flex-auto lg:p-9 p-6 basis-full justify-between gap-8 ${
      type == PanelType.HEADER ?
          'flex-col lg:flex-row' :
          type == PanelType.CONTENT ?
          'flex-col' : ''
  }`}>
      { children }
    </main>
  )
}