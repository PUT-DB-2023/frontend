import React from 'react'
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

interface AccordionMenuProps {
  title: string;
  url: string;
  icon: React.ReactNode;
  children?: any[];
  userMenu? : boolean;
};

export const AccordionMenu = ({title, url, icon, children, userMenu} : AccordionMenuProps) => {
  return (
    <Disclosure>
      {({ open } : {open : boolean}) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between py-2 pl-6 pr-4 hover:bg-blue-600 transition-all">
              <div className='flex items-center space-x-4'>
                  {icon}
                  <Link to={ url } className='hover:text-slate-200 hover:underline transition-all'>{title}</Link>
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
                  <Disclosure.Panel key={index} className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer transition-all"><Link to={url + object.id}>
                    {object.year ? `${object.year} ${object.winter ? '- Zima' : '- Lato'}` : object.name}
                  </Link></Disclosure.Panel> : 
                  <Disclosure.Panel key={index} className="px-10 pt-2 ml-6 pb-2 mb-4 text-sm text-white hover:bg-blue-600 hover:cursor-pointer transition-all"><Link to={url + object.id}>
                    {object.year ? `${object.year} ${object.winter ? '- Zima' : '- Lato'}` : object.name}
                  </Link></Disclosure.Panel>
              }) : null
          }
          {userMenu ?
            <> 
              <Link to='/users/admins/'><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer transition-all">
                Administratorzy
              </Disclosure.Panel></Link>
              <Link to='/users/teachers/'><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer transition-all">
                Dydaktycy
              </Disclosure.Panel></Link>
              <Link to='/users/students/'><Disclosure.Panel className="px-10 pt-2 ml-6 pb-2 text-sm text-white hover:bg-blue-600 hover:cursor-pointer transition-all">
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

export const SideNavigation = () => {
  const { data: courseData, status: courseStatus, refetch: courseRefetch } = useQuery(['courses'], () => getCourses(undefined))
  const { data: serverData, status: serverStatus, refetch: serverRefetch } = useQuery('servers', () => getServers(undefined))
  const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery('groups', getGroups)
  const { data: semesterData, status: semesterStatus, refetch: semesterRefetch } = useQuery('semesters', () => getSemesters(false))

  let coursesContent = null
  let serversContent = null
  let groupsContent = null
  let semestersContent = null

  if (courseStatus === 'loading') {
    coursesContent = (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  else if (courseStatus === 'success') {
      coursesContent = (
          <AccordionMenu title='Przedmioty' url='/courses/' icon={<AcademicCapIcon className='h-5 w-auto'/>} children={courseData}/>
      )
  }

  if (serverStatus === 'loading') {
    coursesContent = (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  else if (serverStatus === 'success') {
    serversContent = (
      <AccordionMenu title='Serwery' url='/servers/' icon={<DatabaseIcon className='h-5 w-auto'/>} children={serverData}/>
    )
  }

  if (groupStatus === 'loading') {
    groupsContent = (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  else if (groupStatus === 'success') {
    groupsContent = (
      <AccordionMenu title='Grupy' url='/groups/' icon={<UserGroupIcon className='h-5 w-auto'/>} children={groupData}/>
    )
  }

  if (semesterStatus === 'loading') {
    semestersContent = (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  else if (semesterStatus === 'success') {
    semestersContent = (
      <AccordionMenu title='Semestry' url='/semesters/' icon={<CalendarIcon className='h-5 w-auto'/>} children={semesterData}/>
    )
  }

  return (
    <nav className='flex flex-col w-full h-full overflow-y-auto mt-12 scrollbar-hide'>
        { coursesContent }
        { serversContent }
        <AccordionMenu title='Użytkownicy' url='/users/' icon={<UserIcon className='h-5 w-auto'/>} userMenu={ true }/>
        { groupsContent }
        { semestersContent }
    </nav>
  )
}