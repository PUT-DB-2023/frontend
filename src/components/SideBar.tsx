import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Disclosure } from '@headlessui/react'
import { AcademicCapIcon, ChevronUpIcon, DatabaseIcon, UsersIcon } from '@heroicons/react/solid'
import { courseList } from 'features/courses/api/getCourses'
import { Edition } from 'features/editions'
import { Course } from 'features/courses'

const Logo = () => {
    return (
        <Link to='/' className='flex items-center text-white px-4 hover:text-slate-200'>
            <img className='h-8 w-auto mr-4' src={logo} alt="PUT Logo"/>
            <span className='text-base font-semibold'>PUT-DB-2023</span>
        </Link>
    )
}

interface AccordionMenuProps {
    title: string;
    icon: React.ReactNode;
    children: Course[] | Edition[];
};

const AccordionMenu = ({title, icon, children} : AccordionMenuProps) => {
    return (
        <Disclosure>
        {({ open } : {open : any}) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between py-2 pl-6 pr-4 hover:bg-blue-600">
                <div className='flex items-center space-x-4'>
                    {icon}
                    <span> {title}</span>
                </div>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : 'rotate-90 transform'
                } h-5 w-5 text-white`}
              />
            </Disclosure.Button>
            {
                children.map((object, index) => {
                    return index != children.length -1 ? <Disclosure.Panel className="px-10 pt-2 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer">
                    {object.name}
                  </Disclosure.Panel> : <Disclosure.Panel className="px-10 pt-2 pb-2 mb-4 text-sm text-white hover:bg-blue-600 hover:cursor-pointer">
                    {object.name}
                  </Disclosure.Panel>
                })
            }
          </>
        )}
      </Disclosure>
    )
}

export const SideBar = () => {
  return (
    <div className='hidden lg:flex flex-col w-72 h-screen z-20 bg-blue-700 text-white'>
        <div className='flex h-14 items-center'>
            <Logo />
        </div>
        <nav className='flex flex-col w-full mt-12'>
            <AccordionMenu title='Przedmioty' icon={<AcademicCapIcon className='h-5 w-auto'/>} children={courseList}/>
            <AccordionMenu title='Serwery' icon={<DatabaseIcon className='h-5 w-auto'/>} children={courseList}/>
            <AccordionMenu title='Użytkownicy' icon={<UsersIcon className='h-5 w-auto'/>} children={courseList}/>
        </nav>
    </div>
  )
}