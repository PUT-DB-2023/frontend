import { Box } from 'components'
import { Link } from 'react-router-dom'
import { courseList } from '../api/getCourses'

export const CourseList = () => {
  return (
    <div className='flex w-full flex-wrap gap-4'>
        { courseList.map(function(object) {
            return <Link to= {'/courses/' + object.id}>
                    <Box title={ object.name }></Box>
                    </Link>
        }) }
    </div>
  )
}
