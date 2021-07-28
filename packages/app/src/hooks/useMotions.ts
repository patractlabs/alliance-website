import { gql, useQuery } from '@apollo/client';
import { Member } from './useMember';

const GET_MEMBERS = gql`
  {
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
  query: {
    members: {
      nodes: T[];
    };
  };
}

export function useMotions() {
  const { data, loading, error } = useQuery<QueryResult<Motion>>(GET_MEMBERS);

  console.log('data', data, data?.query.members.nodes || []);
  return { data: data?.query.members.nodes || [], loading, error };
}
