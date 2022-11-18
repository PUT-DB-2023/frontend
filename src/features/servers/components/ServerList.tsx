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
  serverData: Server[];
}

export const ServerList = ({serverData} : IServerList) => {
  return (
    <div className='w-full h-full flex flex-col items-center'>
      {serverData.length == 0 ? 
        <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Serwerów </div> : 
        serverData.map(function(server : Server) {
          return (
            <Link to={'/servers/' + server.id} className='w-full'>
              <Box color={server.active ? 'bg-blue-800' : 'bg-red-500'}>
                  <span className='font-semibold text-xl'> { server.name } </span>
              </Box>
            </Link>
          )
        }) }
    </div>
  )
}