import { ApolloError, gql, useQuery } from '@apollo/client';
import { Candidate } from './useCandidate';

const GET_CANDIDATES = gql`
  query {
    candidates {
      nodes {
        id
        account {
          id
          address
          additional
          display
          displayParent
          judgements
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
          id
        }
      }
    }
  }
`;

interface QueryResult<T> {
  candidates: {
    nodes: T[];
  };
}

export function useCandidates(): {
  data: Candidate[];
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Candidate>>(GET_CANDIDATES);

  return { data: data?.candidates.nodes || [], loading, error };
}
