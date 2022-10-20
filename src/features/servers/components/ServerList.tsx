import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { Status } from 'types'
import { getServers } from '../api/getServers'
import { Server } from '../types'

interface IServerList {
  serverData: any;
  type: Status;
}

export const ServerList = ({ serverData, type } : IServerList) => {

  if (type == Status.ACTIVE) {
    const activeServers = serverData.filter((obj : any) => obj.active === true)

    return (
      <div className='w-full'>
        { activeServers.map(function(server : any) {
          return <Link to={'/servers/' + server.id}>
                    <Box>
                        <span className='font-semibold text-xl'> { server.name } </span>
                    </Box>
                  </Link>
        }) }
      </div>
    )
  }
  else if (type == Status.INACTIVE) {
    const inactiveServers = serverData.filter((obj : any) => obj.active === false)

    return (
      <div className='w-full h-full overflow-y-auto'>
        { inactiveServers.map(function(server : any) {
          return <Link to={'/servers/' + server.id}>
                    <Box color='bg-red-500'>
                        <span className='font-semibold text-xl'> { server.name } </span>
                    </Box>
                  </Link>
        }) }
      </div>
    )
  }

  return (
    <div className='w-full h-full overflow-y-auto'>
    </div>
  )
}