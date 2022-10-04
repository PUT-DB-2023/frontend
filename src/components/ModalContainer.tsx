import * as React from 'react';
import css from './Modal.module.scss';

export interface IModalContainer {
    title: string,
}

export const ModalContainer: React.FC<IModalContainer> = ({
    title
}) => {
    return (
        <div className={css.outerContainer}>
            <div className={css.middleContainer}>
                <div className={css.innerContainer}>
                    <div className={css.title} >Title</div>
                </div>
            </div>
        </div>
    );
}

ModalContainer.displayName = 'ModalContainer';