import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { Server } from 'features/servers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

export const GroupServerList = (serverData: Server[]) => {
  return (
    <div className='flex w-full flex-wrap gap-4'>
        { serverData.map(function(server : Server) {
            return (
                    <Box>
                      <span className='font-semibold text-xl'> { server.name } </span>
                    </Box>
                  )
        }) }
    </div>
  )
}