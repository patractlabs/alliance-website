import { gql, useQuery } from '@apollo/client';
import { Blacklist } from './useBlacklist';

const query = gql`
  query {
    blacklists {
      nodes {
        id
        account {
          id
          display
          address
        }
        website
        isAccount
        addTime
        removeTime
        addMotionIndex
        removeMotionIndex
      }
    }
  }
`;

interface QueryResult<T> {
  blacklists: {
    nodes: T[];
  };
}

export function useBlacklists() {
  const { data, loading, error } = useQuery<QueryResult<Blacklist>>(query);

  console.log('useBlacklists', data);
  return { data: data?.blacklists.nodes || [], loading, error };
}
