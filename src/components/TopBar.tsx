import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ClipboardCopyIcon, PencilIcon } from '@heroicons/react/outline'

interface ProfileMenuProps {
  name: string;
  role: string;
  image? : string;
}

interface NavBarProps {
  children: string[];
}

const NavBar = ({children} : NavBarProps) => {

}

const ProfileMenu = ({name, role} : ProfileMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex text-black items-center space-x-4">
            <div className='flex flex-col text-end'>
              <span className='text-base font-semibold'>{name}</span>
              <span className='text-sm'>{role}</span>
            </div>
            <div className='h-9 w-9 rounded-full bg-black'></div>
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active } : { active : any }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-700 text-white' : 'text-black'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profil
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active } : { active : any }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-700 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Wyloguj
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
      </Menu>
  )
}

export const TopBar = () => {
  return (
    <div className='w-full h-16 bg-white shadow-md flex text-base text-black z-10 items-center px-12 justify-between'>
        <span>Przedmioty</span>
        <ProfileMenu name='Bartosz Bębel' role='Dydaktyk'/>
    </div>
  )
}