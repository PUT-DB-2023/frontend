import { Box } from 'components'
import { Link } from 'react-router-dom'
import * as React from 'react'
import AuthContext from 'context/AuthContext';

export const UserTypeList = () => {
    const { authUser, checkPermission } = React.useContext(AuthContext);
    return (
        <div className='w-full h-full'>
            {authUser.is_superuser && // TMP: in future switch to checkPermission
                <Link to='/users/admins/'>
                    <Box>
                        <span className='font-semibold text-xl'> Administratorzy </span>
                    </Box>
                </Link>}
            <Link to='/users/teachers/'>
                <Box>
                    <span className='font-semibold text-xl'> Dydaktycy </span>
                </Box>
            </Link>
            <Link to='/users/students/'>
                <Box>
                    <span className='font-semibold text-xl'> Studenci </span>
                </Box>
            </Link>
        </div>
    )
}