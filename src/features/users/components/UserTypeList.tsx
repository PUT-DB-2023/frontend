import { Box } from 'components'
import { Link } from 'react-router-dom'

export const UserTypeList = () => {
    return (
        <div className='flex w-full flex-wrap gap-4'>
            <Box route='/users/admins/'>
                <span className='font-semibold text-xl'> Administratorzy </span>
            </Box>
            <Box route='/users/teachers/'>
                <span className='font-semibold text-xl'> Dydaktycy </span>
            </Box>
            <Box route='/users/students/'>
                <span className='font-semibold text-xl'> Studenci </span>
            </Box>
        </div>
        )
}
