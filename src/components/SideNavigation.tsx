import { AcademicCapIcon, BookOpenIcon, CalendarIcon, DatabaseIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/solid'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from 'context/AuthContext'
import * as React from 'react'

interface INavItem {
  title: string;
  icon: ReactNode;
}

const NavItem = ({ title, icon }: INavItem) => {
  return (
    <div className='flex w-full items-center gap-5 py-2 pl-6 pr-4 hover:bg-blue-600 transition-all'>
      {icon}
      {title}
    </div>
  )
}

export const SideNavigation = () => {
  const { authUser, checkPermission } = React.useContext(AuthContext);
  return (
    <nav className='flex flex-col w-full h-full overflow-y-auto mt-12 scrollbar-hide'>
      <Link to='/courses/'>
        <NavItem title='Przedmioty' icon={<BookOpenIcon className='h-5 w-auto' />} />
      </Link>
      {checkPermission('database.view_server') &&
        <Link to='/servers/'>
          <NavItem title='Serwery' icon={<DatabaseIcon className='h-5 w-auto' />} />
        </Link>}
      <Link to='/users/'>
        <NavItem title='Użytkownicy' icon={<UsersIcon className='h-5 w-auto' />} />
      </Link>
      <Link to='/groups/'>
        <NavItem title='Grupy' icon={<UserGroupIcon className='h-5 w-auto' />} />
      </Link>
      {checkPermission('database.view_semester') &&
        <Link to='/semesters/'>
          <NavItem title='Semestry' icon={<CalendarIcon className='h-5 w-auto' />} />
        </Link>}
      {checkPermission('database.view_semester') &&
      <Link to='/majors/'>
        <NavItem title='Kierunki' icon={<AcademicCapIcon className='h-5 w-auto' />} />
      </Link>}
      {checkPermission('database.view_semester') &&
      <Link to='/providers/'>
        <NavItem title='Systemy bazodanowe' icon={
        <div className='flex'>
          <DatabaseIcon className='h-5 w-auto' />
        </div>
      } />
      </Link>}
    </nav>
    
  )
}