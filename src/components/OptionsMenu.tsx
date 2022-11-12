import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import React from 'react'

interface IOptionsMenu {
    edit: () => void,
    remove: () => void
}

export const OptionsMenu = ({edit, remove} : IOptionsMenu) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button className="flex text-black items-center space-x-4">
            <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500'/>
            </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
            <Menu.Item>
            {({ active } : { active : any }) => (
                <button
                    onClick={edit}
                    className={`${
                    active ? 'bg-blue-100' : 'text-black'
                    } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                >
                Edytuj
                </button>
            )}
            </Menu.Item>

            <Menu.Item>
            {({ active } : { active : any }) => (
                <button
                    onClick={remove}
                    className={`${
                    active ? 'bg-red-500 text-white' : 'text-red-500'
                    } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                >
                Usuń
                </button>
            )}
            </Menu.Item>
        </div>
        </Menu.Items>
    </Menu>
  )
}
