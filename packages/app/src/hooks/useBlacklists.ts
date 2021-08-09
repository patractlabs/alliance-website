import { ApolloError, gql, useQuery } from '@apollo/client';
import { Blacklist } from './useBlacklist';

const query = gql`
  query {
    blacklists {
      nodes {
        id
        account {
          id
          display
          displayParent
          address
          judgements
        }
        website
        isAccount
        addTime
        addBlock
        addExtrinsic
        addMotionIndex
        removeTime
        removeBlock
        removeExtrinsic
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

export function useBlacklists(): {
  data: Blacklist[];
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Blacklist>>(query);

  return { data: data?.blacklists.nodes || [], loading, error };
}
