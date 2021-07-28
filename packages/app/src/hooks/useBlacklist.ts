import { gql, useQuery } from '@apollo/client';
import { Account } from './useMember';

const GET_BLACKLIST = gql`
  query Query($id: String!) {
    blacklist(id: $id) {
      id
      account {
        id
        display
      }
      website
      isAccount
      addTime
      removeTime
      addMotionIndex
      removeMotionIndex
    }
  }
`;

export interface Blacklist {
  id: string;
  account: Account | null;
  website: string | null;
  isAccount: boolean | null;
  addTime: string | null;
  removeTime: string | null;
  addMotionIndex: number | null;
  removeMotionIndex: number | null;
}

interface QueryResult<T> {
  blacklist: T;
}

export function useBlacklist(id: string) {
  const { data, loading, error } = useQuery<QueryResult<Blacklist>>(GET_BLACKLIST, { variables: { id } });

  console.log('useBlacklist', data, id);
  return { data: data?.blacklist, loading, error };
}
