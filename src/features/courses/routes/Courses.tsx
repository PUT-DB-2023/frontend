import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import AuthContext from 'context/AuthContext'
import { queryClient } from 'lib/react-query'
import * as React from 'react'
import { ButtonType, PanelType } from 'types'
import { AddNewModal } from '../components/AddNewModal'
import { CourseList } from '../components/CourseList'


export const Courses = () => {
  const [newModal, setNewModal] = React.useState(false);
  const {authUser, checkPermission} = React.useContext(AuthContext)
  React.useEffect(() => {document.title = `Przedmioty`},[])

  return (
    <ContentLayout>
      {checkPermission('database.add_course') && <AddNewModal refetch={() => queryClient.refetchQueries(['courses'])} show={newModal} off={() => setNewModal(false)} />}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Przedmioty</span>
        {checkPermission('database.add_course') && <Button type={ButtonType.ACTION} text='Dodaj przedmiot' onClick={() => setNewModal(true)} />}
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <CourseList />
      </ContentPanel>
    </ContentLayout>
  )
}