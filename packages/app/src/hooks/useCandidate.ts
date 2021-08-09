import { ApolloError, gql, useQuery } from '@apollo/client';
import { Account } from './useMember';

const QUERY = gql`
  query Query($id: String!) {
    candidate(id: $id) {
      id
      account {
        id
        address
        additional
        display
        displayParent
        legal
        web
        riot
        email
        pgpFingerprint
        image
        twitter
        judgements
      }
      locked
      nominator {
        id
      }
      applyBlock
      applyExtrinsic
      applyTime
    }
  }
`;

export interface Candidate {
  id: string;
  account: Account;
  locked: string | null;
  nominator: {
    id: string;
  } | null;
  applyBlock: string | null;
  applyExtrinsic: number | null;
  applyTime: string | null;
}

interface QueryList<T> {
  candidate: T;
}

// fix: addres not id
export function useCandidate(id: string): {
  data: Candidate | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryList<Candidate>>(QUERY, { variables: { id } });

  return { data: data?.candidate, loading, error };
}
