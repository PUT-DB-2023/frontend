import { useClickOutside } from 'hooks/useClickOutside';
import { Logo } from './Logo'
import { SideNavigation } from './SideNavigation'

interface IMobileSidebar {
  show: boolean;
  off: () => void;
}

export const MobileSideBar = ({show, off} :IMobileSidebar) => {
    const ref = useClickOutside(off);
    if (show) {
    return (
      <div className='absolute top-0 left-0 w-screen h-screen overflow-x-hidden overflow-y-auto bg-black bg-opacity-25 z-[100]'>
        <div className={`flex absolute left-0 lg:hidden flex-col w-72 h-screen z-50 bg-blue-700 text-white`} ref={ref}>
            <div className='flex h-14 items-center'>
                <Logo />
            </div>
            <SideNavigation />
        </div>
      </div>
      )
    }
    else return null
}