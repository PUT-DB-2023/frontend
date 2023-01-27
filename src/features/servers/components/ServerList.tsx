import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import { Toolbar } from 'components/Toolbar'
import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { ButtonType, serversSortOptions } from 'types'
import { getServers } from '../api/getServers'
import { Server } from '../types'

export const ServerList = () => {
  const [sortBy, setSortBy] = useState(serversSortOptions[0]);
  const [search, setSearch] = useState('');

  const [showActiveOnly, setShowActiveOnly] = useState<boolean | undefined>(true) // show only active courses (true - active only, undefined - all courses)
  const { data: serverData, status: serverStatus, refetch: serverRefetch } = useQuery(['servers', showActiveOnly], () => getServers({ active: showActiveOnly }));

  const searchData = useMemo(() => searchFunc(search, serverData, ['name']), [search, serverData]);
  const sortedServers = useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  const nonActiveLast = useCallback((data: any[]) => {
    const active = data?.filter(i => i?.active);
    const nonActive = data?.filter(i => !i?.active);
    return active?.concat(nonActive);
  }, []);

  const activeSorted = nonActiveLast(sortedServers);

  if (serverStatus === 'loading') {
    return <Loading />
  }

  if (serverStatus === 'error') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        ERROR
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8 justify-center items-center'>
      <Toolbar sort={true} filter={false} search={true} sortOptions={serversSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj serwera' />
      <div className='w-full h-full flex flex-col items-center'>
        {serverData.length == 0 ?
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Serwerów </div> :
          activeSorted.map((server: Server) => {
            return (
              <Link to={'/servers/' + server.id} className='w-full' key={server.id}>
                <Box color={server.active ? 'bg-blue-800' : 'bg-red-500'}>
                  <span className='font-semibold text-xl'> {server.name} </span>
                </Box>
              </Link>
            )
          })}
      </div>
      <Button type={ButtonType.LOAD_HIDDEN} text={showActiveOnly ? 'Pokaż nieaktywne' : 'Schowaj nieaktywne'} onClick={() => { setShowActiveOnly(showActiveOnly ? undefined : true) }} />
    </div>
  )
}