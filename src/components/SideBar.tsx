import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Disclosure } from '@headlessui/react'
import { AcademicCapIcon, ChevronUpIcon, DatabaseIcon, UsersIcon } from '@heroicons/react/solid'
// import { courseList } from 'features/courses/api/getCourses'
import { Edition } from 'features/editions'
import { Course } from 'features/courses'
import { useQuery } from 'react-query'
import { getCourses } from 'features/courses/api/getCourses'
import { getServers } from 'features/servers/api/getServers'

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
    url: string;
    icon: React.ReactNode;
    children?: Course[] | Edition[];
    userMenu? : boolean;
};

const AccordionMenu = ({title, url, icon, children, userMenu} : AccordionMenuProps) => {
    return (
        <Disclosure>
        {({ open } : {open : any}) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between py-2 pl-6 pr-4 hover:bg-blue-600">
                <div className='flex items-center space-x-4'>
                    {icon}
                    <Link to={ url } className='hover:text-slate-200 hover:underline'>{title}</Link>
                </div>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : 'rotate-90 transform'
                } h-5 w-5 text-white`}
              />
            </Disclosure.Button>
            {children?.length  && !userMenu ?
                children.map((object, index) => {
                    return index != children.length -1 ? 
                    <Link key={index} to={url + object.id}><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer">
                      {object.name}
                    </Disclosure.Panel></Link> : 
                    <Link key={index} to={url + object.id}><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 mb-4 text-sm text-white hover:bg-blue-600 hover:cursor-pointer">
                      {object.name}
                    </Disclosure.Panel></Link>
                }) : null
            }
            {userMenu ?
              <> 
                <Link to='/users/admins/'><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer">
                  Administratorzy
                </Disclosure.Panel></Link>
                <Link to='/users/teachers/'><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer">
                  Dydaktycy
                </Disclosure.Panel></Link>
                <Link to='/users/students/'><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer">
                  Studenci
                </Disclosure.Panel></Link>
                </>
                : null
            }
          </>
        )}
      </Disclosure>
    )
}

export const SideBar = () => {
  const coursesQuery = useQuery('courses', getCourses)
  const serversQuery = useQuery('servers', getServers)
  let coursesContent = null
  let serversContent = null

  // TODO move the mutations into separate files in the API directory (see bulletproof_react)

  if (coursesQuery.isLoading) {
    coursesContent = (
      <div>
        Loading..
      </div>
    );
  }
  else if (coursesQuery.isError) {
    return (
      <> Server error! </>
    )
  }

  else {
      coursesContent = (
          <AccordionMenu title='Przedmioty' url='/courses/' icon={<AcademicCapIcon className='h-5 w-auto'/>} children={coursesQuery.data}/>
      )
  }

  if (serversQuery.isLoading) {
    serversContent = (
      <div>
        Loading..
      </div>
    );
  }
  else if (serversQuery.isError) {
    return (
      <> Server error! </>
    )
  }

  else {
      serversContent = (
          <AccordionMenu title='Serwery' url='/servers/' icon={<DatabaseIcon className='h-5 w-auto'/>} children={serversQuery.data}/>
      )
  }

  return (
    <div className='hidden lg:flex flex-col w-72 h-screen z-20 bg-blue-700 text-white'>
        <div className='flex h-14 items-center'>
            <Logo />
        </div>
        <nav className='flex flex-col w-full mt-12'>
            { coursesContent }
            { serversContent }
            <AccordionMenu title='Użytkownicy' url='/users/' icon={<UsersIcon className='h-5 w-auto'/>} userMenu={ true }/>
        </nav>
    </div>
  )
}