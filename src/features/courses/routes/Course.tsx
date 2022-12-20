import { Listbox } from '@headlessui/react'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { OptionsMenu } from 'components/OptionsMenu'
import { Spinner } from 'components/Spinner'
import { Edition } from 'features/editions'
import { getEditions } from 'features/editions/api/getEditions'
import { AddNewModal as AddEditionModal } from 'features/editions/components/AddNewModal'
import { RemoveModal as RemoveEditionModal } from 'features/editions/components/RemoveModal'
import * as React from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { ButtonType, editionsSortOptions, PanelType } from 'types'
import { EditModal as EditEditionModal } from '../../editions/components/EditModal'
import { getCourse } from '../api/getCourse'
import { EditModal } from '../components/EditModal'
import { RemoveModal } from '../components/RemoveModal'
import { AddNewModal as AddGroupModal } from 'features/groups/components/AddNewModal'
import { InfoBoxDisclosure } from 'components/InfoBox'


export const Course = () => {
  const [removeModal, setRemoveModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [addEditionModal, setAddEditionModal] = React.useState(false)
  const [addGroupModal, setAddGroupModal] = React.useState(false)
  const [editEditionModal, setEditEditionModal] = React.useState(false)
  const [removeEditionModal, setRemoveEditionModal] = React.useState(false)
  const [sortBy, setSortBy] = React.useState(editionsSortOptions[0])
  const [filterBy, setFilterBy] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [selectedEdition, setSelectedEdition] = React.useState<Edition>()

  const { courseId, editionId } = useParams()


  const { data : courseData, status : courseStatus, refetch : courseRefetch } = useQuery(['course', courseId], () => getCourse(courseId));
  const { data : activeEditionData, status : activeEditionStatus, refetch : activeEditionRefetch } = useQuery(['activeEditions', courseId], () => getEditions(true, courseId));
  const { data : allEditionsData, status : allEditionsStatus, refetch : allEditionsRefetch } = useQuery(['allEditions', courseId, editionId], () => getEditions(undefined, courseId));

  React.useEffect(() => {document.title = `Przedmiot: ${courseData?.name}`},[courseData?.name])

  const navigate = useNavigate()

  React.useEffect(() => {
    if (editionId !== undefined) {
      if (allEditionsData && allEditionsData.length > 0 && allEditionsData.filter((edition: Edition) => edition.id == editionId).length > 0) {
        setSelectedEdition(allEditionsData.filter((edition: Edition) => edition.id == editionId)[0])
        navigate(`editions/${editionId}/`, { replace: true })
      }
      else {
        if (allEditionsStatus === 'success') navigate('', { replace: true })
      }
    }
    else {
      if (activeEditionData && activeEditionData.length !== 0) {
        setSelectedEdition(activeEditionData[0])
        navigate(`editions/${activeEditionData[0].id}/`, { replace: true })
      }
      else if(allEditionsData !== undefined && allEditionsData.length !== 0) {
        setSelectedEdition(allEditionsData[0])
        navigate(`editions/${allEditionsData[0].id}/`, { replace: true })
      }
      else {
        navigate('', { replace: true })
      }
    }
    
  }, [allEditionsData, activeEditionData])

  const allRefetch = async () => {    
    await activeEditionRefetch();
    await allEditionsRefetch();    
  }

  // const handleAddGroup = () => {
  //   if ()
  // }

  if (activeEditionStatus == 'loading' || allEditionsStatus == 'loading' || courseStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <ContentLayout>
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={courseId} name={courseData.name} />
        <EditModal refetch={() => courseRefetch()} show={editModal} off={() => setEditModal(false)} data={courseData} />
        <AddGroupModal show={addGroupModal} off={() => setAddGroupModal(false)} refetch={allRefetch} edition={editionId}/>
        {courseId && <AddEditionModal show={addEditionModal} off={() => setAddEditionModal(false)} refetch={allRefetch} courseId={courseId}/> }
        {courseId && <EditEditionModal show={editEditionModal} off={() => setEditEditionModal(false)} refetch={allRefetch} data={selectedEdition} courseId={courseId}/>}
        {courseId && <RemoveEditionModal name={'Usuń edycję'} show={removeEditionModal} off={() => setRemoveEditionModal(false)} courseId={courseId} editionId={selectedEdition?.id} refetch={allRefetch}/>}
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>{ courseData.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'> { allEditionsData !== undefined ? allEditionsData.length : '' } edycje </h2>
            {courseData?.description && <InfoBoxDisclosure children={courseData.description}/>}          </div>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Dodaj edycję' onClick={()=>setAddEditionModal(true)}/>
            <OptionsMenu edit={() => setEditModal(true)} remove={() => setRemoveModal(true)}></OptionsMenu>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <div className='flex flex-col gap-6'>
            <div className='flex justify-between lg:flex-row md:flex-row flex-col'>
              <h2 className='text-lg font-semibold'>Wybrana edycja</h2>
              {allEditionsData.length ? 
              <div className='flex gap-6 lg:flex-row md:flex-row flex-col-reverse'>
                <Button type={ButtonType.ACTION} text='Dodaj grupę' onClick={() => setAddGroupModal(true)} />
                <div className='flex gap-6'>
                  <Listbox value={selectedEdition} onChange={setSelectedEdition}>
                      <div className="relative w-[232px] rounded-md">
                          <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 rounded-lg border border-zinc-400 flex px-1 justify-between items-center h-9 hover:border-zinc-500 focus:border-blue-800'>
                              <span className='flex justify-start w-full px-2'>
                              {selectedEdition?.semester.start_year}/{selectedEdition && selectedEdition.semester.start_year + 1} - {selectedEdition?.semester.winter ? "Zima" : "Lato"}
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                              </svg>
                          </Listbox.Button>
                          <Listbox.Options className='z-10 absolute mt-2 w-full overflow-auto rounded-md shadow-md bg-white border-[1px] border-zinc-300 max-h-56'>
                              {allEditionsData.sort((a : Edition, b : Edition) => (b.semester.start_year > a.semester.start_year)).map((edition : Edition) => (
                                  <Link key={edition.id} to={`editions/${edition.id}/`}>
                                <Listbox.Option className='cursor-pointer'
                                        key={edition.id}
                                        value={edition}
                                      >
                                          {({ selected }) => (         
                                            <>   
                                            <div className={`${selected ? 'bg-blue-100' : 'hover:bg-zinc-100 [&>div]:hover:bg-blue-600'} flex gap-7 w-full`}>
                                                <div className={`w-1 ${selected ? 'bg-blue-600' : ''}`}></div>
                                                <span className={`${selected ? `font-normal text-blue-600` : `font-normal`} my-[6px]`}>{edition!.semester.start_year}/{edition!.semester.start_year+1} - {edition!.semester.winter ? "Zima" : "Lato"}</span>
                                            </div>                
                                            </>
                                            
                                        )}
                                    </Listbox.Option>
                                  </Link>
                              ))}
                          </Listbox.Options>
                      </div>
                    </Listbox>
                    <OptionsMenu edit={() => setEditEditionModal(true)} remove={() => setRemoveEditionModal(true)}></OptionsMenu>
                  </div>
              </div>
              : null}
              {/* : null}      */}
            </div>
              {allEditionsData.length ? null : 
                <h1 className='text-3xl font-bold'>Brak edycji</h1>
              }
            <Outlet />  
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}