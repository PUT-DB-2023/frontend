import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

export const Logo = () => {
    return (
        <Link to='/' className='flex items-center text-white px-4 hover:text-slate-200 transition-all'>
            <img className='h-8 w-auto mr-4' src={logo} alt="PUT Logo"/>
            <span className='text-base font-semibold'>PUT-DB-2023</span>
        </Link>
    )
}
