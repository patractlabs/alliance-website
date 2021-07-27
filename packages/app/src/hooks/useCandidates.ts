import { gql, useQuery } from '@apollo/client';
import { Candidate } from './useCandidate';

const GET_CANDIDATES = gql`
  {
    query {
      candidates {
        nodes {
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
          applyTime
          nominator {
            display
          }
        }
      }
    }
  }
`;

interface QueryList<T> {
  query: {
    candidates: {
      nodes: T[];
    };
  };
}

export function useCandidates() {
  const { data, loading, error } = useQuery<QueryList<Candidate>>(GET_CANDIDATES);

  console.log('data', data);
  return { data: data?.query.candidates.nodes || [], loading, error };
}
