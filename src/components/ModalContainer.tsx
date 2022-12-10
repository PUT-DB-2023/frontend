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
    const ref = useClickOutside(off);
    return (
        <div className={`absolute w-full h-full top-0 left-0 overflow-x-hidden overflow-y-auto z-20 bg-black/25`} >
            <div className={`flex w-full h-full p-[20px]`}>
                <div className={`max-h-full lg:min-w-[460px] md:lg:min-w-[460px] overflow-auto flex flex-col gap-4 bg-white shadow-md rounded-md m-auto justify-between`} ref={ref} style={style}>
                        <div className={`font-semibold text-lg px-6 pt-6`} >{title}</div>
                        <div className={`overflow-y-auto px-6 ${buttons ? '' : 'pb-6'}`}>{children}</div>
                        {buttons ?? <div className='pb-6'>{buttons}</div>}
                </div>
            </div>
        </div>
    );
}

ModalContainer.displayName = 'ModalContainer';