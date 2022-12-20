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
                <div className={`max-h-[85vh] max-w-[60vw] lg:min-w-[640px] md:min-w-[640px] overflow-auto flex flex-col bg-white shadow-md rounded-md m-auto justify-between`} ref={ref} style={style}>
                        <div className={`font-semibold text-xl px-8 py-6 border-b-[1px] `} >{title}</div>
                        <div className={`overflow-y-auto lg:pt-8 md:pt-8 pt-4 lg:px-8 md:px-8 px-2 pb-20 grow`}>{children}</div>
                        {buttons ? <div className='flex gap-2 w-full justify-end px-8 py-6 border-t-[1px]'>{buttons}</div> : null}
                </div>
            </div>
        </div>
    );
}

ModalContainer.displayName = 'ModalContainer';