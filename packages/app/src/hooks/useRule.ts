import { ApolloError, gql, useQuery } from '@apollo/client';

const query = gql`
  query {
    rules {
      nodes {
        id
        cid
        createTime
        motionIndex
      }
    }
  }
`;

interface Rule {
  id: string;
  cid: string;
  createTime: string;
  motionIndex: number;
}

interface QueryResult<T> {
  rules: {
    nodes: T[];
  };
}

export function useRule(): {
  data: Rule | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Rule>>(query);

  return { data: data?.rules.nodes[0], loading, error };
}
