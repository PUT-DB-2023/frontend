import React from 'react'
import { PanelType } from 'types';

interface IContentPanel {
    type: PanelType;
    children?: React.ReactNode;
};

export const ContentPanel = ({type, children} : IContentPanel) => {
  return (
    <main className={`bg-white w-full h-auto shadow-md rounded-lg flex lg:p-9 p-6 gap-8 ${
      type === PanelType.HEADER ? 'flex-col lg:flex-row justify-between' :
      type === PanelType.CONTENT ? 'flex-col flex-grow' :
      type === PanelType.OUTLINE ? 'flex-col pt-0 lg:pt-0' :
      type === PanelType.GRADIENT ? 'flex-col bg-gradient-to-r from-blue-600 to-blue-600' : ''
    }`}>
      { children }
    </main>
  )
}