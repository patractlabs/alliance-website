import { ApolloError, gql, useQuery } from '@apollo/client';

const GET_MEMBERS = gql`
  query {
    motions {
      nodes {
        id
        hash
        proposerId
        index
        createTime
        createBlock
        closeTime
        closeBlock
      }
    }
  }
`;

export interface Motion {
  id: string;
  hash: string;
  proposerId: string;
  index: number;
  createTime: string;
  createBlock: number;
  closeTime: string;
  closeBlock: number;
}
interface QueryResult<T> {
  members: {
    nodes: T[];
  };
}

export function useMotions(): {
  data: Motion[];
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Motion>>(GET_MEMBERS);

  console.log('data', data, data?.members.nodes || []);
  return { data: data?.members.nodes || [], loading, error };
}
