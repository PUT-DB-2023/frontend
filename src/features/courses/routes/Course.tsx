import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { getEditions } from 'features/editions/api/getEditions'
import { getEdition } from 'features/editions/api/getEdition'
import { useQuery } from 'react-query'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { ButtonType, Status, PanelType, editionsSortOptions, groupsSortOptions } from 'types'
import { getCourse } from '../api/getCourse'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'
import { Toolbar } from 'components/Toolbar'
import { ChevronDoubleUpIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import { Listbox, Menu } from '@headlessui/react'
import { AddNewModal as AddEditionModal } from 'features/editions/components/AddNewModal'
import { sortFunc } from 'api/sortFilter'
import { searchFunc } from 'api/searchApi'
import { OptionsMenu } from 'components/OptionsMenu'
import { GroupList } from 'features/editions/components/GroupList'
import { getEditionGroups } from 'features/editions/api/getEditionGroups'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Edition } from 'features/editions'
import { Semester } from 'features/semesters'
import { Teacher } from 'features/users'
import { Group } from 'features/groups/types'


export const Course = () => {
  const [removeModal, setRemoveModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [addEditionModal, setAddEditionModal] = React.useState(false)

  const [selectedEdition, setSelectedEdition] = React.useState<Edition>()

  const { courseId, editionId } = useParams()

  console.log('Course params:', useParams())

  const { data : courseData, status : courseStatus, refetch : courseRefetch } = useQuery(['course', courseId], () => getCourse(courseId));
  const { data : activeEditionData, status : activeEditionStatus, refetch : activeEditionRefetch } = useQuery(['activeEditions', courseId], () => getEditions(true, courseId));
  const { data : allEditionsData, status : allEditionsStatus, refetch : allEditionsRefetch } = useQuery(['allEditions', courseId, editionId], () => getEditions(undefined, courseId));

  const navigate = useNavigate()

  React.useEffect(() => {
    if (editionId !== undefined) {
      if (allEditionsData !== undefined && allEditionsData.length !== 0) {
        setSelectedEdition(allEditionsData.filter((edition: Edition) => edition.id == editionId)[0])
        navigate(`editions/${editionId}/`)
      }
    }
    else {
      if (activeEditionData !== undefined && activeEditionData.length !== 0) {
        setSelectedEdition(activeEditionData[0])
        navigate(`editions/${activeEditionData[0].id}/`)
      }
      else if(allEditionsData !== undefined && allEditionsData.length !== 0) {
        setSelectedEdition(allEditionsData[0])
        navigate(`editions/${allEditionsData[0].id}/`)
      }
    }
    
  }, [editionId, allEditionsData, activeEditionData])

  if (allEditionsStatus == 'loading' || courseStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  console.log(allEditionsData)
  
  return (
    <ContentLayout>
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={courseId} name={courseData.name} />
        <EditModal refetch={() => courseRefetch()} show={editModal} off={() => setEditModal(false)} data={courseData} />
        {courseId && <AddEditionModal show={addEditionModal} off={() => setAddEditionModal(false)} refetch={() => console.log('aa')} courseId={courseId}/> }
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>{ courseData.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'> { allEditionsData !== undefined ? allEditionsData.length : '' } edycje </h2>
            <h3 className='text-slate-500 text-base text-justify'>{ courseData.description }</h3>
          </div>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Dodaj edycję' onClick={()=>setAddEditionModal(true)}/>
            <OptionsMenu edit={() => setEditModal(true)} remove={() => setRemoveModal(true)}></OptionsMenu>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <div className='flex flex-col gap-6'>
            <div className='flex justify-between'>
              <h2 className='text-lg font-semibold'>Wybrana edycja</h2>
              {/* {selectedEdition ? */}
              <div className='flex gap-6'>
                <Button type={ButtonType.ACTION} text='Dodaj grupę' onClick={() => console.log('ADD GROUP')} />
                <Listbox value={selectedEdition} onChange={setSelectedEdition}>
                    <div className="relative w-[232px]">
                        <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 rounded-lg border border-zinc-400 flex px-1 justify-between items-center h-9 hover:border-zinc-500 focus:border-blue-800'>
                            {/* <ChevronDownIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/> */}
                            <span className='flex justify-start w-full px-2'>
                              {selectedEdition?.semester.year} - {selectedEdition?.semester.winter ? "Zima" : "Lato"}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Listbox.Button>
                        <Listbox.Options className='absolute p-1 w-full overflow-auto rounded-lg shadow-xl bg-white max-h-56'>
                            {allEditionsData.sort((a : Edition, b : Edition) => (b.semester.year.localeCompare(a.semester.year) || Number(b.semester.winter) - Number(a.semester.winter))).map((edition : Edition) => (
                                <Link to={`editions/${edition.id}/`}>
                                  <Listbox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer rounded-lg'
                                      key={edition.id}
                                      value={edition}
                                    >
                                      {({ selected }) => (         
                                          <>                   
                                              <span className={selected ? `font-bold` : `font-normal`}>{edition!.semester.year} - {edition!.semester.winter ? "Zima" : "Lato"}</span>
                                          </>
                                      )}
                                  </Listbox.Option>
                                </Link>
                            ))}
                        </Listbox.Options>
                    </div>
                  </Listbox>
                  <OptionsMenu edit={() => console.log(true)} remove={() => console.log(true)}></OptionsMenu>
              </div>
              {/* : null}      */}
            </div>
            <Outlet />  
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}