import * as React from 'react';
import { useClickOutside } from 'hooks/useClickOutside';

export interface IModalContainer {
    title: string,
    off: () => void,
    buttons?: any,
    children?: any,
}

export const ModalContainer: React.FC<IModalContainer> = ({
    title, off, children, buttons
}) => {
    const ref = useClickOutside(off);
    return (
        <div className={`absolute w-full h-full top-0 left-0 overflow-x-hidden overflow-y-auto z-20 bg-black/25`}>
            <div className={`flex w-full h-full p-[20px]`}>
                <div className={`max-h-[85vh] lg:min-h-[560px] md:min-h-[560px] lg:min-w-[560px] md:lg:min-w-[560px] overflow-auto flex flex-col gap-4 p-6 bg-white shadow-md rounded-md m-auto justify-between`} ref={ref}>
                    <div className={`font-semibold text-lg`} >{title}</div>
                    <div className='overflow-y-auto'>{children}</div>
                    {buttons ?? <div>{buttons}</div>}
                </div>
            </div>
        </div>
    );
}

ModalContainer.displayName = 'ModalContainer';