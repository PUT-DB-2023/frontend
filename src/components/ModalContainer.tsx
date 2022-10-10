import * as React from 'react';
import css from './Modal.module.scss';
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
        <div className={css.outerContainer}>
            <div className={css.middleContainer}>
                <div className={`shadow-md rounded-md ${css.innerContainer}`} ref={ref}>
                    <div className={css.title} >{title}</div>
                    {children}
                </div>
            </div>
        </div>
    );
}

ModalContainer.displayName = 'ModalContainer';