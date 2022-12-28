import React from 'react'
import { useNavigate } from 'react-router';
import { ButtonType } from 'types'
import { Button } from './Button'

interface IErrorPage {
    text: string;
    buttonText: string;
}

export const ErrorPage = ({text, buttonText}: IErrorPage) => {
  const navigate = useNavigate()

  return (
    <div className='w-full h-full flex gap-8 flex-col justify-center items-center'>
      <h2 className="text-xl text-red-500 font-semibold"> {text}</h2>
      <Button type={ButtonType.ACTION} onClick={() => navigate('/')} text={buttonText} />
    </div>
  )
}