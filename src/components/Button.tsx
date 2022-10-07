import React, { MouseEventHandler } from 'react'
import { ButtonType } from 'types';

interface ButtonProps {
    type: ButtonType;
    text: String;
    onClick?: MouseEventHandler;
}

export const Button = ({type, text, onClick} : ButtonProps) => {
  return (
    <button onClick={ onClick } className={`w-40 h-9 flex items-center justify-center rounded-md ${
        type == ButtonType.ACTION ?
            'bg-blue-800 text-white' :
            type == ButtonType.WARNING ?
                'bg-red-500 text-white' :
                type == ButtonType.OUTLINE ?
                    'text-blue-800 border border-blue-800' : 
                    type == ButtonType.TEXT_ACTION ?
                      'text-blue-800' :
                      type == ButtonType.TEXT_WARNING ?
                      'text-red-500' : ''
    }`}>{text}</button>
  )
}