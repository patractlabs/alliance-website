import { ApolloError, gql, useQuery } from '@apollo/client';
import { Account } from './useMember';

const GET_BLACKLIST = gql`
  query Query($id: String!) {
    blacklist(id: $id) {
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
`;

export interface Blacklist {
  id: string;
  account: Account | null;
  website: string | null;
  isAccount: boolean | null;
  addTime: string | null;
  addBlock: string | null;
  addExtrinsic: number | null;
  addMotionIndex: number | null;
  removeTime: string | null;
  removeBlock: string | null;
  removeExtrinsic: number | null;
  removeMotionIndex: number | null;
}

interface QueryResult<T> {
  blacklist: T;
}

export function useBlacklist(id: string): {
  data: Blacklist | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Blacklist>>(GET_BLACKLIST, { variables: { id } });

  return { data: data?.blacklist, loading, error };
}
