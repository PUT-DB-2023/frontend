import React from 'react'
import { ButtonTypes } from 'types';

interface ButtonProps {
    type: ButtonTypes;
    text: String;
}

export const Button = ({type, text} : ButtonProps) => {
  return (
    <button className={`w-40 h-9 flex items-center justify-center rounded-md ${
        type == ButtonTypes.action ?
            'bg-blue-700 text-white' :
            type == ButtonTypes.warning ?
                'bg-red-500 text-white' :
                type == ButtonTypes.outline ?
                    'text-blue-700 border border-blue-700' : ''
    }`}>{text}</button>
  )
}