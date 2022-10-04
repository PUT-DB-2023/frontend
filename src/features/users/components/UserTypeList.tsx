import { Box } from 'components'
import { Link } from 'react-router-dom'

export const UserTypeList = () => {
    return (
        <div className='flex w-full flex-wrap gap-4'>
            <Link to='/users/admins/'>
                <Box>
                    <span className='font-semibold text-xl'> Administratorzy </span>
                </Box>
            </Link>
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
