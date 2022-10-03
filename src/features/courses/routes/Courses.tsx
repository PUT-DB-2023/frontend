import { ContentLayout, ContentPanel } from 'components'
import { Box } from 'components'
import { Button } from 'components/Button'
import { Link } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { CourseList } from '../components/CourseList'

export const Courses = () => {
  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}> 
          <span className='text-black text-3xl font-bold mb-4'>Przedmioty</span>
          <div className='flex gap-4'>
            <Button type={ButtonType.ACTION} text='Dodaj'/>
          </div>
        </ContentPanel>
        <CourseList></CourseList>
    </ContentLayout>
  )
}