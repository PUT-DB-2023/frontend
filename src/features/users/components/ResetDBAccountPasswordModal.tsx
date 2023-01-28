import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType, DbAccount } from 'types';
import { isStudentOrTeacher } from '../api/checkUserType';
import { resetDBAccountPassword } from '../api/resetDBAcountPassword';
import { Student, Teacher, Admin } from '../types';

interface IResetModal {
    show: boolean,
    off: () => void,
    dbAccount: DbAccount | undefined;
    user: Student | Teacher | Admin,
}

export const ResetDBAccountPasswordModal = ({ show, off, dbAccount, user }: IResetModal) => {
    const handleReset = React.useCallback(async () => {
        const res = await resetDBAccountPassword(dbAccount?.id);
        if (res) {
            off();
        }
    }, [dbAccount])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Resetuj' onClick={handleReset} />
    </>

    const first_name = isStudentOrTeacher(user) ? user?.user?.first_name : (user?.first_name ? user?.first_name : '');
    const last_name = isStudentOrTeacher(user) ? user?.user?.last_name : (user?.last_name ? user?.last_name : '');

    if (show) {
        return (
            <ModalContainer title={'Resetowanie hasła'} off={off} buttons={buttons}>
                Akcja ta spowoduje zresetowanie obecnego hasła użytkownika <strong>{first_name} {last_name}</strong> dla konta <strong>{dbAccount?.editionServer?.server?.name}</strong>.<br />
                Nowe hasło zostanie wysłane mailem.
            </ModalContainer>
        );
    } else {
        return null;
    }
};

ResetDBAccountPasswordModal.displayName = 'ResetDBAccountPasswordModal';