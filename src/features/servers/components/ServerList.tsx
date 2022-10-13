import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { getServers } from '../api/getServers'
import { Server } from '../types'

export const ServerList = ({ serverData } : any) => {
  return (
    <div className='flex w-full flex-wrap gap-4'>
        { serverData.map(function(server : Server) {
            return (
                    <Box route={'/servers/' + server.id}>
                      <span className='font-semibold text-xl'> { server.name } </span>
                    </Box>
                  )
        }) }
    </div>
  )
}