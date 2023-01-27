import { UserType } from 'types';
import { User } from '../types';

interface IUserInfo {
    userData: any;
    userAccessor: User;
    userType: UserType;
}

export const UserInfo = ({ userData, userAccessor, userType }: IUserInfo) => {
    return (
        <>
            <div className='flex flex-col w-full gap-2'>
                <div className='flex flex-col p-2 gap-2'>
                    <span className='text-black text-base font-semibold'> Imię </span>
                    <span className='text-slate-600 text-base'> {userAccessor.first_name} </span>
                </div>
                <div className='flex flex-col p-2 gap-2'>
                    <span className='text-black text-base font-semibold'> Nazwisko </span>
                    <span className='text-slate-600 text-base'> {userAccessor.last_name} </span>
                </div>
            </div>

            <div className='flex flex-col w-full gap-2'>
                {userType === UserType.STUDENT ? <div className='flex flex-col p-2 gap-2'>
                    <span className='text-black text-base font-semibold'> Indeks </span>
                    <span className='text-slate-600 text-base'> {userData.student_id} </span>
                </div> : null}
                <div className='flex flex-col p-2 gap-2'>
                    <span className='text-black text-base font-semibold'> E-mail </span>
                    <span className='text-slate-600 text-base'> {userAccessor.email} </span>
                </div>
            </div>
        </>
    )
}
