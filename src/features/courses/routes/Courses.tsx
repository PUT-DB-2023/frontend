import { ContentLayout } from 'components'
import { Box } from 'components'
import { Link } from 'react-router-dom'
import { courseList } from '../api/getCourses'

export const Courses = () => {
  return (
    <ContentLayout title='Przedmioty'>
        <div className='flex w-full flex-wrap'>
            { courseList.map(function(object) {
              return <Link to= {'/courses/' + object.id}>
                       <Box title={ object.name }></Box>
                      </Link>
            }) }
        </div>
    </ContentLayout>
  )
}