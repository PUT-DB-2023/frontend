import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Loading } from 'components/Loading'
import { OptionsMenu } from 'components/OptionsMenu'
import { Toolbar } from 'components/Toolbar'
import AuthContext from 'context/AuthContext'
import { useMemo, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getMajors } from '../api/getMajors'
import { Major, majorsSortOptions } from '../types'
import { EditModal } from './EditModal'
import { RemoveModal } from './RemoveModal'

export const MajorList = () => {

  const [sortBy, setSortBy] = useState(majorsSortOptions[0])
  const [search, setSearch] = useState('');
  const { authUser, checkPermission } = useContext(AuthContext);
  const [removeModal, setRemoveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<Major>();

  const { data: majorData, status: majorStatus, refetch: majorRefetch } = useQuery(['majors'], getMajors)

  const searchData = useMemo(() => searchFunc(search, majorData, ['name', 'day', 'hour', 'teacherEdition/edition/course/name', 'teacherEdition/edition/semester/start_year']), [search, majorData]);
  const sortedMajors = useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);
  console.log(majorData, authUser)
  if (majorStatus == 'loading') {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-8'>
      {checkPermission('database.change_major') && currentModal && <EditModal show={editModal} off={() => setEditModal(false)} data={currentModal} refetch={majorRefetch} />}
      {checkPermission('database.delete_major') && <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={currentModal?.id} name={`Usuwanie kierunku ${currentModal?.name}`} refetch={majorRefetch} />}
      <Toolbar sort={true} filter={false} search={true} sortOptions={majorsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj kierunku' />
      <div className='w-full'>
        {majorData.length == 0 ?
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Kierunków </div> :
          sortedMajors.map((major: Major) => {
            return (
              <Box>
                <div className='flex justify-between'>
                  <span className='font-semibold text-xl'> {major?.name}</span>
                  <OptionsMenu
                    edit={checkPermission('database.change_major') ? (() => { setCurrentModal(major); setEditModal(true) }) : undefined}
                    remove={checkPermission('database.delete_major') ? (() => { setCurrentModal(major); setRemoveModal(true) }) : undefined}
                  />
                </div>
              </Box>
            )
          })}
      </div>
    </div>
  )
}
