import { ContentLayout } from 'components'
import { Box } from 'components'
import { Link } from 'react-router-dom'
import { CourseList } from '../components/CourseList'

export const Courses = () => {
  return (
    <ContentLayout title='Przedmioty'>
        <CourseList></CourseList>
    </ContentLayout>
  )
}