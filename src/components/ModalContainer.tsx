import * as React from 'react';
import { useClickOutside } from 'hooks/useClickOutside';

export interface IModalContainer {
    title: string,
    off: () => void,
    buttons?: any,
    children?: any,
    style?: {},
}

export const ModalContainer: React.FC<IModalContainer> = ({
    title, off, children, buttons, style
}) => {
    console.log(buttons)
    const ref = useClickOutside(off);
    return (
        <div className={`absolute w-full h-full top-0 left-0 overflow-x-hidden overflow-y-auto z-20 bg-black/25`} >
            <div className={`flex w-full h-full p-[20px]`}>
                <div className={`max-h-full lg:min-w-[460px] md:lg:min-w-[460px] overflow-auto flex flex-col gap-5 p-6 bg-white shadow-md rounded-md m-auto justify-between`} ref={ref} style={style}>
                        <div className={`font-semibold text-xl px-1`} >{title}</div>
                        <div className={`overflow-y-auto p-1 grow`}>{children}</div>
                        {buttons ? <div className='flex gap-2 w-full justify-end px-1'>{buttons}</div> : null}
                </div>
            </div>
        </div>
    );
}

ModalContainer.displayName = 'ModalContainer';