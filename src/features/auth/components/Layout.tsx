import { ReactNode } from 'react'
import { ReactComponent as Logo } from '../../../assets/put_logo.svg'

interface ILayout {
  children?: ReactNode;
  title: string;
}

export const Layout = ({ children, title }: ILayout) => {
  return (
    <div className='w-full min-h-screen flex flex-col gap-10 justify-center items-center bg-zinc-100 p-6 overflow-x-hidden'>
      <div className='flex flex-col gap-6 justify-center items-center'>
        <Logo className='w-28 h-auto'></Logo>
        <h1 className='text-4xl font-bold text-zinc-900'>{title}</h1>
      </div>
      {children}
    </div>
  )
}
