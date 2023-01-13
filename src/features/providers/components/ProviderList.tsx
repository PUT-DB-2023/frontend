import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Loading } from 'components/Loading'
import { Toolbar } from 'components/Toolbar'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getProviders } from '../api/getProviders'
import { Provider, majorsSortOptions } from '../types'

export const ProviderList = () => {

  const [sortBy, setSortBy] = useState(majorsSortOptions[0])
  const [filterBy, setFilterBy] = useState(null);
  const [search, setSearch] = useState('');

  const { data: majorData, status: majorStatus, refetch: majorRefetch } = useQuery(['providers'], getProviders)

  const searchData = useMemo(() => searchFunc(search, majorData, ['name', 'day', 'hour', 'teacherEdition/edition/course/name', 'teacherEdition/edition/semester/start_year']), [search, majorData]);
  const sortedProviders = useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);
  console.log(majorData)
  if (majorStatus == 'loading') {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-8'>
      <Toolbar sort={true} filter={false} search={true} sortOptions={majorsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj grupy' />
      <div className='w-full'>
        {majorData.length == 0 ?
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Kierunków </div> :
          sortedProviders.map((major: Provider) => {
            return (
              <Box>
                <span className='font-semibold text-xl'> {major?.name}</span>
              </Box>
            )
          })}
      </div>
    </div>
  )
}