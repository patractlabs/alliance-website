import { gql, useQuery } from '@apollo/client';
import { Account } from './useMember';

const GET_CANDIDATE = gql`
  query Query($id: String!) {
    candidate(id: $id) {
      id
      account {
        id
        address
        additional
        display
        legal
        web
        riot
        email
        pgpFingerprint
        image
        twitter
      }
      locked
      nominator {
        display
      }
      applyTime
    }
  }
`;

export interface Candidate {
  id: string;
  account: Account;
  locked: number | null;
  nominator: {
    display: string;
  } | null;
  applyTime: string | null;
}

interface QueryList<T> {
  candidate: T;
}

export function useCandidate(id: string) {
  const { data, loading, error } = useQuery<QueryList<Candidate>>(GET_CANDIDATE, { variables: { id } });

  console.log('data', data);
  return { data: data?.candidate, loading, error };
}