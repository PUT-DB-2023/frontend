import React from 'react'
import { ButtonType } from 'types';

interface ButtonProps {
    type: ButtonType;
    text: String;
}

export const Button = ({type, text} : ButtonProps) => {
  return (
    <button className={`w-40 h-9 flex items-center justify-center rounded-md ${
        type == ButtonType.ACTION ?
            'bg-blue-700 text-white' :
            type == ButtonType.WARNING ?
                'bg-red-500 text-white' :
                type == ButtonType.OUTLINE ?
                    'text-blue-700 border border-blue-700' : ''
    }`}>{text}</button>
  )
}