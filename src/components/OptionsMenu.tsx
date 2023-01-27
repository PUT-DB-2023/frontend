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
                <Menu.Items className="z-10 absolute right-0 mt-4 border-[1px] border-zinc-300 min-w-[212px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="">
                        {customMenuItems?.map((item: CustomOptionMenuItem) => {
                            return (
                                <Menu.Item key={item.text}>
                                    {({ active }: { active: boolean }) => (
                                        <button
                                            onClick={() => item.onClick()}
                                            className={`${active ? 'bg-zinc-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full text-base`}
                                        >
                                            <div className={`w-1 ${active ? 'bg-blue-600' : ''}`}></div>
                                            <span className='py-[6px] font-normal'>
                                                {item.text}
                                            </span>
                                        </button>
                                    )}
                                </Menu.Item>
                            )
                        })}
                        {edit ?
                            <Menu.Item>
                                {({ active }: { active: boolean }) => (
                                    <button
                                        onClick={edit}
                                        className={`${active ? 'bg-zinc-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full text-base`}
                                    >
                                        <div className={`w-1 ${active ? 'bg-blue-600' : ''}`}></div>
                                        <span className='py-[6px] font-normal'>
                                            Edytuj
                                        </span>
                                    </button>
                                )}
                            </Menu.Item>
                            : null}
                        {remove ?
                            <Menu.Item>
                                {({ active }: { active: boolean }) => (
                                    <button
                                        onClick={remove}
                                        className={`${active ? 'bg-zinc-100 text-red-500' : 'hover:bg-zinc-100 [&>div]:hover:bg-red-500'} flex gap-7 w-full text-base`}
                                    >
                                        <div className={`w-1 ${active ? 'bg-red-500' : ''}`}></div>
                                        <span className='py-[6px] font-normal'>
                                            Usuń
                                        </span>
                                    </button>
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