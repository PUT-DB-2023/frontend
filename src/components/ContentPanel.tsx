import React from 'react'
import { PanelType } from 'types';

interface ContentPanelProps {
    type: PanelType;
    children?: React.ReactNode;
};

export const ContentPanel = ({type, children} : ContentPanelProps) => {
  return (
    <main className={`bg-white w-full h-auto shadow-md rounded-lg flex lg:p-9 p-6 justify-between gap-8 ${
      type === PanelType.HEADER ? 'flex-col lg:flex-row' :
      type === PanelType.CONTENT ? 'flex-col' :
      type === PanelType.OUTLINE ? 'flex-col pt-0 lg:pt-0' :
      type === PanelType.GRADIENT ? 'flex-col bg-gradient-to-r from-blue-600 to-blue-600' : ''
    }`}>
      { children }
    </main>
  )
}