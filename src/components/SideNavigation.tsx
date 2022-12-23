import { AcademicCapIcon, CalendarIcon, DatabaseIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/solid'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

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