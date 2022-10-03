import { Box } from "components";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { EditionStatus } from "types";
import { getEditions } from "../api/getEditions";
import { Edition } from "../types";
import { EditionRow } from "./EditionRow";

interface EditionListProps {
  id: string;
  type: EditionStatus;
}

export const EditionList = ({id, type} : EditionListProps) => {
  const editionsQuery = useQuery('editions', () => getEditions( id ))

  let editionsContent = null;
  
  if (editionsQuery.isLoading) {
    return (
      <div>
        Loading..
      </div>
    );
  }
  else if (editionsQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }
  else {
    if (type == EditionStatus.ACTIVE) {
      const activeEditions = editionsQuery.data.filter((obj : Edition) => obj.active === true)

      return (
        <div className='w-full h-full overflow-y-auto'>
          { activeEditions.map(function(edition : Edition) {
            return <Link to= {'/editions/' + edition.id}>
                      <EditionRow>
                        <span className='text-base font-semibold'>{ edition.name }</span>
                      </EditionRow>
                    </Link>
          }) }
        </div>
      )
    }
    else if (type == EditionStatus.CLOSED) {
      const closedEditions = editionsQuery.data.filter((obj : Edition) => obj.active === false)

      return (
        <div className='w-full h-full overflow-y-auto'>
          { closedEditions.map(function(edition : Edition) {
            return <Link to= {'/editions/' + edition.id}>
                      <EditionRow color='bg-red-500'>
                        <span className='text-base font-semibold'>{ edition.name }</span>
                      </EditionRow>
                    </Link>
          }) }
        </div>
      )
    }
  }

  return (
    <div className='w-full h-full overflow-y-auto'>
    </div>
  )
}
