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
      addMotionHash
      removeMotionHash
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
  addMotionHash: string | null;
  removeMotionHash: string | null;
}

interface QueryList<T> {
  blacklist: T;
}

export function useBlacklist(id: string) {
  const { data, loading, error } = useQuery<QueryList<Blacklist>>(GET_BLACKLIST, { variables: { id } });

  console.log('data', data);
  return { data: data?.blacklist, loading, error };
}
