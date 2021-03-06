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
        createExtrinsic
        closeTime
        closeBlock
        closeExtrinsic
      }
    }
  }
`;

export interface Motion {
  id: string;
  hash: string;
  proposerId?: string;
  index: number;
  createTime?: string;
  createBlock?: string;
  createExtrinsic?: number;
  closeTime?: string;
  closeBlock?: string;
  closeExtrinsic?: number;
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

  return { data: data?.members.nodes || [], loading, error };
}
