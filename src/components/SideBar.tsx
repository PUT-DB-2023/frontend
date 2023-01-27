import { Logo } from './Logo'
import { SideNavigation } from './SideNavigation'

export const SideBar = () => {
  return (
    <div className='hidden lg:flex flex-col w-72 h-screen z-20 bg-blue-700 text-white'>
      <div className='flex h-14 items-center'>
        <Logo />
      </div>
      <SideNavigation />
    </div>
  )
}