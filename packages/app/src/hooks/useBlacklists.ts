import { gql, useQuery } from '@apollo/client';
import { Blacklist } from './useBlacklist';

const query = gql`
  {
    query {
      blacklists {
        nodes {
          id
          account {
            id
            display
          }
          website
          isAccount
          addTime
          removeTime
          addMotionHash
          removeMotionHash
        }
      }
    }
  }
`;

interface QueryList<T> {
  query: {
    blacklists: {
      nodes: T[];
    };
  };
}

export function useBlacklists() {
  const { data, loading, error } = useQuery<QueryList<Blacklist>>(query);

  console.log('data', data);
  return { data: data?.query.blacklists.nodes || [], loading, error };
}
