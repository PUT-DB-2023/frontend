import { ContentLayout } from 'components'
import { Box } from 'components'
// import { courseList } from 'features/courses/api/getCourses'
import { useParams } from "react-router-dom";

export const Editions = () => {

  let { id } : any = useParams()

  return (
    <ContentLayout>
        <div className='flex w-full flex-wrap'>
            <Box title='Lato 2022'></Box>
            <Box title='Zima 2021/22'></Box>
        </div>
    </ContentLayout>
  )
}