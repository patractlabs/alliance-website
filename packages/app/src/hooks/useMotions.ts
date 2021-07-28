import { gql, useQuery } from '@apollo/client';
import { Member } from './useMember';

const GET_MEMBERS = gql`
  {
    query {
      members {
        nodes {
          id
        }
      }
    }
  }
`;

interface QueryList<T> {
  query: {
    members: {
      nodes: T[];
    };
  };
}

export function useMotions() {
  const { data, loading, error } = useQuery<QueryList<Member>>(GET_MEMBERS);

  console.log('data', data, data?.query.members.nodes || []);
  return { data: data?.query.members.nodes || [], loading, error };
}
