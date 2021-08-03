import { ApolloError, gql, useQuery } from '@apollo/client';
import { Motion } from './useMotions';

const Query = gql`
  query Query($motionsFilter: MotionFilter) {
    motions(filter: $motionsFilter) {
      nodes {
        id
        index
        hash
        proposerId
        createTime
        createBlock
        createExtrinsic
        closeTime
        closeBlock
        proposer {
          address
          display
          displayParent
          web
          email
          image
        }
      }
    }
  }
`;

interface QueryResult<T> {
  motions: {
    nodes: T[];
  };
}

export function useMotionByIndex(index?: number | null): {
  data: Motion | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Motion>>(Query, {
    variables: {
      motionsFilter: {
        index: { equalTo: index }
      }
    }
  });

  return { data: data?.motions.nodes[0], loading, error };
}
