import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-center text-white'>
            <img className='h-8 w-auto mr-4' src={logo} alt="PUT Logo"/>
            <span className='text-base font-semibold'>PUT-DB-2023</span>
        </div>
    )
}

export const SideBar = () => {
  return (
    <div className='hidden lg:flex flex-col w-72 px-4 h-screen z-20 bg-blue-700 text-white'>
        <div className='flex h-14 items-center'>
            <Logo />
        </div>
        <div className='flex flex-col w-64 mt-12 px-4'>
            <Link className='text-white font-semibold text-base my-2' to='/courses'>Przedmioty</Link>
            <Link className='text-white font-semibold text-base my-2' to='/courses'>Serwery</Link>
            <Link className='text-white font-semibold text-base my-2' to='/courses'>Studenci</Link>
            <Link className='text-white font-semibold text-base my-2' to='/courses'>Dydaktycy</Link>
            <Link className='text-white font-semibold text-base my-2' to='/courses'>Administratorzy</Link>
        </div>
    </div>
  )
}