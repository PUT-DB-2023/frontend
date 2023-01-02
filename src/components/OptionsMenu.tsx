import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'

export interface CustomOptionMenuItem {
    text: string,
    onClick: (...args: any[]) => void,
}

interface IOptionsMenu {
    edit?: (...args: any[]) => void,
    remove?: (...args: any[]) => void,
    onClick?: (...args: any[]) => void,
    customMenuItems?: CustomOptionMenuItem[],
}

export const OptionsMenu = ({ edit, remove, onClick, customMenuItems }: IOptionsMenu) => {

    if (edit || remove || (customMenuItems && customMenuItems?.length > 0) || onClick) {
        return (
            <Menu as="div" className="relative inline-block text-left rounded-md">
                <div className='rounded-md'>
                    <Menu.Button className="flex text-black items-center space-x-4" onClick={onClick ?? undefined}>
                        <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500' />
                    </Menu.Button>
                </div>
                <Menu.Items className="z-10 absolute right-0 mt-4 border-[1px] border-zinc-300 w-[212px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="">
                        {customMenuItems?.map((item: CustomOptionMenuItem) => {
                            return (
                                <Menu.Item key={item.text}>
                                    {({ active }: { active: boolean }) => (
                                        <div className={`${active ? 'bg-zinc-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                                            <div className={`w-1 ${active ? 'bg-blue-600' : ''}`}></div>
                                            <button
                                                onClick={() => item.onClick()}
                                                className={`${active ? `font-normal` : `font-normal`} my-[6px] w-full flex text-base`}
                                            >
                                                {item.text}
                                            </button>
                                        </div>
                                    )}
                                </Menu.Item>
                            )
                        })}
                        {edit ?
                            <Menu.Item>
                                {({ active }: { active: boolean }) => (
                                    <div className={`${active ? 'bg-zinc-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                                        <div className={`w-1 ${active ? 'bg-blue-600' : ''}`}></div>
                                        <button
                                            onClick={edit}
                                            className={`${active ? `font-normal` : `font-normal`} my-[6px] w-full flex text-base`}
                                        >
                                            Edytuj
                                        </button>
                                    </div>
                                )}
                            </Menu.Item>
                            : null}
                        {remove ?
                            <Menu.Item>
                                {({ active }: { active: boolean }) => (
                                    <div className={`${active ? 'bg-red-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-500'} flex gap-7 w-full`}>
                                        <div className={`w-1 ${active ? 'bg-red-500' : ''}`}></div>
                                        <button
                                            onClick={remove}
                                            className={`${active ? `font-normal text-red-500` : `font-normal`} my-[6px] w-full flex text-base`}
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                )}
                            </Menu.Item>
                            : null}
                    </div>
                </Menu.Items>
            </Menu>
        )
    } else {
        return null;
    }

}
