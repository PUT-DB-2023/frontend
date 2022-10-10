import { ContentLayout, ContentPanel } from 'components'
import { Box } from 'components'
import { Button } from 'components/Button'
import { Link } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { CourseList } from '../components/CourseList'
import { ModalContainer } from 'components/ModalContainer';
import { AddNewModal } from '../components/AddNewModal'
import * as React from 'react';

export const Courses = () => {
  const [newModal, setNewModal] = React.useState(false);
  return (
    <ContentLayout>
      <AddNewModal show={newModal} off={() => setNewModal(false)} />
      <ContentPanel type={PanelType.LARGE}>
        <span className='text-black text-3xl font-bold mb-4'>Przedmioty</span>
        <div className='flex gap-4'>
          <Button type={ButtonType.ACTION} text='Dodaj' onClick={() => setNewModal(true)}/>
        </div>
      </ContentPanel>
      <CourseList></CourseList>
    </ContentLayout>
  )
}