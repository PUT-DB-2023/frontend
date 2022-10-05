import { ContentLayout, ContentPanel } from 'components'
import { Box } from 'components'
import { Button } from 'components/Button';
import { CourseList } from 'features/courses/components/CourseList';
// import { courseList } from 'features/courses/api/getCourses'
import { useParams } from "react-router-dom";
import { ButtonType, PanelType } from 'types';
import { GroupList } from '../components/GroupList';

export const Editions = () => {

  let { id } : any = useParams()

  return (
    <ContentLayout>
      {/* <ModalContainer title='Test' /> */}
      <ContentPanel type={PanelType.LARGE}>
        <span className='text-black text-3xl font-bold mb-4'>Edycje</span>
        <div className='flex gap-4'>
          <Button type={ButtonType.ACTION} text='Dodaj' />
        </div>
      </ContentPanel>
      <GroupList></GroupList>
    </ContentLayout>
  )
}