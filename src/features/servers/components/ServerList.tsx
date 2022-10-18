import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { getServers } from '../api/getServers'
import { Server } from '../types'

export const ServerList = ({ serverData } : any) => {
  return (
    <div className='w-full h-full'>
        { serverData.map(function(server : Server) {
            return (
                    <Link to={'/servers/' + server.id}>
                      <Box>
                          <span className='font-semibold text-xl'> { server.name } </span>
                      </Box>
                    </Link>
                  )
        }) }
    </div>
  )
}