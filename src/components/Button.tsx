import React from 'react'
import { ButtonType } from 'types';

interface ButtonProps {
    type: ButtonType;
    text: String;
    onClick?: () => void;
}

export const Button = ({type, text, onClick} : ButtonProps) => {
  return (
    <button className={`lg:w-40 w-20 h-9 flex items-center justify-center rounded-md ${
        type == ButtonType.ACTION ?
            'bg-blue-800 text-white' :
            type == ButtonType.WARNING ?
                'bg-red-500 text-white' :
                type == ButtonType.OUTLINE ?
                    'text-blue-800 border border-blue-800' : ''
    }`} onClick={onClick ?? undefined}>{text}</button>
  )
}