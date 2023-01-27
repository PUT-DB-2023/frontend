import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Loading } from 'components/Loading'
import { OptionsMenu } from 'components/OptionsMenu'
import { Toolbar } from 'components/Toolbar'
import AuthContext from 'context/AuthContext'
import { useMemo, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { getProviders } from '../api/getProviders'
import { Provider, majorsSortOptions } from '../types'
import { EditModal } from './EditModal'
import { RemoveModal } from './RemoveModal'

export const ProviderList = () => {
  const [sortBy, setSortBy] = useState(majorsSortOptions[0])
  const [search, setSearch] = useState('');
  const { checkPermission } = useContext(AuthContext);
  const [removeModal, setRemoveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<Provider>();

  const { data: providersData, status: providersStatus, refetch: providersRefetch } = useQuery(['providers'], getProviders)

  const searchData = useMemo(() => searchFunc(search, providersData, ['name', 'day', 'hour', 'teacherEdition/edition/course/name', 'teacherEdition/edition/semester/start_year']), [search, providersData]);
  const sortedProviders = useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  if (providersStatus == 'loading') {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-8'>
      {checkPermission('database.change_dbms') && currentModal && <EditModal show={editModal} off={() => setEditModal(false)} data={currentModal} refetch={providersRefetch} />}
      {checkPermission('database.delete_dbms') && <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={currentModal?.id} name={`Usuwanie dostawcy ${currentModal?.name}`} refetch={providersRefetch} />}
      <Toolbar sort={true} filter={false} search={true} sortOptions={majorsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj dostawcy' />
      <div className='w-full'>
        {providersData.length == 0 ?
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak systemów bazodanowych </div> :
          sortedProviders.map((provider: Provider) => {
            return (
              <Box key={provider.id}>
                <div className='flex justify-between'>
                  <span className='font-semibold text-xl'> {provider?.name}</span>
                  <OptionsMenu
                    edit={checkPermission('database.change_dbms') ? (() => { setCurrentModal(provider); setEditModal(true) }) : undefined}
                    remove={checkPermission('database.delete_dbms') ? (() => { setCurrentModal(provider); setRemoveModal(true) }) : undefined}
                  />
                </div>
              </Box>
            )
          })}
      </div>
    </div>
  )
}
