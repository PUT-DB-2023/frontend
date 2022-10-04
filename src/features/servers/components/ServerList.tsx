import { Box } from 'components'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { getServers } from '../api/getServers'
import { Server } from '../types'

export const ServerList = () => {
  // const [newCourse, setNewCourse] = useState('')
  const serversQuery = useQuery('servers', getServers)

  // TODO move the mutations into separate files in the API directory (see bulletproof_react)

  if (serversQuery.isLoading) {
    return (
      <div>
        Loading..
      </div>
    );
  }

console.log(serversQuery.data)

  return (
    <div className='flex w-full flex-wrap gap-4'>
        { serversQuery.data.map(function(server : Server) {
            return <Link to= {'/servers/' + server.id}>
                    <Box title={ server.name }></Box>
                    </Link>
        }) }
    </div>
  )
}