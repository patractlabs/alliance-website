import { ApolloError, gql, useQuery } from '@apollo/client';

const Query = gql`
  query Query($motionActionsFilter: MotionActionFilter) {
    motionActions(filter: $motionActionsFilter) {
      nodes {
        id
        motionIndex
        accountId
        approve
        block
      }
    }
  }
`;

interface Action {
  id: string;
  motionIndex: number;
  accountId: string;
  approve?: boolean;
  block?: bigint;
}
interface QueryResult<T> {
  motionActions: {
    nodes: T[];
  };
}

export function useActionByMotionIndex(index?: number | null): {
  data: Action[];
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Action>>(Query, {
    variables: {
      motionActionsFilter: { motionIndex: { equalTo: index } }
    }
  });

  console.log('useActionByMotionIndex', data);
  return { data: data?.motionActions.nodes || [], loading, error };
}
