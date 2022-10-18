import * as React from 'react';
import { useClickOutside } from 'hooks/useClickOutside';

export interface IModalContainer {
    title: string,
    off: () => void,
    children?: any,
}

export const ModalContainer: React.FC<IModalContainer> = ({
    title, off, children
}) => {
    const ref = useClickOutside(off);
    return (
        <div className={`absolute w-full h-full top-0 left-0 overflow-x-hidden overflow-y-auto z-20 bg-black/25`}>
            <div className={`flex w-full h-full`}>
                <div className={`w-[32rem] h-[24rem] max-w-[90vw] max-h-[90vh] flex flex-col gap-4 p-6 bg-white shadow-md rounded-md m-auto justify-between`} ref={ref}>
                    <div className={`font-semibold text-lg`} >{title}</div>
                    {children}
                </div>
            </div>
        </div>
    );
}

ModalContainer.displayName = 'ModalContainer';