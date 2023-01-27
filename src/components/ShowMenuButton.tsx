import { MenuAlt2Icon } from '@heroicons/react/solid';

interface ShowMenuButtonProps {
  onClick?: () => void;
}

export const ShowMenuButton = ({ onClick }: ShowMenuButtonProps) => {
  return (
    <button className='flex lg:hidden' onClick={onClick}>
      <MenuAlt2Icon className='h-7 w-auto'> </MenuAlt2Icon>
    </button>
  )
}