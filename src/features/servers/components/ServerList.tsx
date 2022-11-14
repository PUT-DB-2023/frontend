import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { ButtonType, Status } from 'types'
import { getServers } from '../api/getServers'
import { Server } from '../types'

interface IServerList {
  sortVal: any;
  sortSet: (v: any) => void;
  searchVal: string;
  searchSet: (v: any) => void;
}

export const ServerList = ({sortVal, sortSet, searchVal, searchSet} : IServerList) => {
  const [showActiveOnly, setShowActiveOnly] = useState<boolean | undefined>(true) // show only active courses (true - active only, undefined - all courses)
  const { data: serverData, status: serverStatus, refetch: serverRefetch } = useQuery(['servers', showActiveOnly], () => getServers(showActiveOnly));

  const searchData = useMemo(() => searchFunc(searchVal, serverData, ['name']), [searchVal, serverData]);
  const sortedServers = useMemo(() => sortFunc(searchData, sortVal),[searchData, sortVal]);

  if (serverStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  console.log(showActiveOnly)

  return (
    <div className='w-full h-full flex flex-col items-center'>
      {sortedServers.length == 0 ? 
        <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Wyników </div> : 
        sortedServers.map(function(server : Server) {
          return (
            <Link to={'/servers/' + server.id} className='w-full'>
              <Box color={server.active ? 'bg-blue-800' : 'bg-red-500'}>
                  <span className='font-semibold text-xl'> { server.name } </span>
              </Box>
            </Link>
          )
        }) }
        {sortedServers.length !== 0 ? <Button type={ButtonType.ACTION} text={showActiveOnly ? 'Pokaż nieaktywne' : 'Schowaj nieaktywne'} onClick={() => {setShowActiveOnly(showActiveOnly ? undefined : true)}} /> : null}
    </div>
  )
}