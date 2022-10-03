import { Box } from 'components'
import { Link } from 'react-router-dom'

export const UserTypeList = () => {
    return (
        <div className='flex w-full flex-wrap gap-4'>
            <Link to='/users/admins/'>
                <Box title='Administratorzy'></Box>
            </Link>
            <Link to='/users/teachers/'>
                <Box title='Dydaktycy'></Box>
            </Link>
            <Link to='/users/students/'>
                <Box title='Studenci'></Box>
            </Link>
        </div>
        )
}
