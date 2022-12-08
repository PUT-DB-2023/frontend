import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Disclosure } from '@headlessui/react'
import { AcademicCapIcon, CalendarIcon, ChevronUpIcon, DatabaseIcon, UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
// import { courseList } from 'features/courses/api/getCourses'
import { Edition } from 'features/editions'
import { Course } from 'features/courses'
import { Semester } from 'features/semesters'
import { useQuery } from 'react-query'
import { getCourses } from 'features/courses/api/getCourses'
import { getServers } from 'features/servers/api/getServers'
import { Spinner } from './Spinner'
import { getGroups } from 'features/groups/api/getGroups'
import { getSemesters } from 'features/semesters/api/getSemesters'

interface INavItem {
  title: string;
  icon: ReactNode;
}

const NavItem = ({title, icon} : INavItem) => {
  return (
    <div className='flex w-full items-center gap-5 py-2 pl-6 pr-4 hover:bg-blue-600 transition-all'>
      {icon}
      {title}
    </div>
  )
}

export const SideNavigation = () => {

  return (
    <nav className='flex flex-col w-full h-full overflow-y-auto mt-12 scrollbar-hide'>
        <Link to='/courses/'>
          <NavItem title='Przedmioty' icon={<AcademicCapIcon className='h-5 w-auto'/>} />
        </Link>
        <Link to='/servers/'>
          <NavItem title='Serwery' icon={<DatabaseIcon className='h-5 w-auto'/>} />
        </Link>
        <Link to='/users/'>
          <NavItem title='Użytkownicy' icon={<UsersIcon className='h-5 w-auto'/>} />
        </Link>
        <Link to='/groups/'>
          <NavItem title='Grupy' icon={<UserGroupIcon className='h-5 w-auto'/>} />
        </Link>
        <Link to='/semesters/'>
          <NavItem title='Semestry' icon={<CalendarIcon className='h-5 w-auto'/>} />
        </Link>
    </nav>
  )
}