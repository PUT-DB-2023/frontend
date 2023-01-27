import { ButtonType } from 'types';

interface ButtonProps {
  type: ButtonType;
  text: String;
  onClick?: () => void;
}

export const Button = ({type, text, onClick} : ButtonProps) => {
  return (
    <button className={`lg:min-w-[120px] flex-shrink-0 min-w-[120px] w-auto p-4 h-9 flex items-center justify-center rounded-lg ${
      type == ButtonType.ACTION ? 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-800' :
      type == ButtonType.WARNING ? 'bg-red-600 text-white hover:bg-red-500 active:bg-red-600' :
      type == ButtonType.OUTLINE ? 'text-blue-800 border border-blue-800 hover:text-blue-500 hover:border-blue-700 active:text-blue-800 active:border-blue-800' : 
      type == ButtonType.TEXT_ACTION ? 'text-blue-700 hover:text-blue-500 active:text-blue-800' :
      type == ButtonType.TEXT_WARNING ? 'text-red-600 hover:text-red-500 active:text-red-600' : 
      type == ButtonType.LOAD_HIDDEN ? 'max-w-[240px] flex justify-center items-center text-zinc-600 hover:bg-zinc-100' : ''
      }`} onClick={onClick ?? undefined}>
      {text}
    </button>
  )
}