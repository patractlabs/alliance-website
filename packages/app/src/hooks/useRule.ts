import { ApolloError, gql, useQuery } from '@apollo/client';

const query = gql`
  query {
    rules {
      nodes {
        id
        cid
        createBlock
        createExtrinsic
        createTime
        motionIndex
        content
      }
    }
  }
`;

interface Rule {
  id: string;
  cid: string;
  createBlock?: number;
  createExtrinsic?: number;
  createTime: string;
  motionIndex: number;
  content: string | null;
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

  return {
    data: data?.rules.nodes.reduce(
      (latest: Rule | undefined, rule: Rule): Rule =>
        latest && latest.createBlock && rule.createBlock && latest.createBlock > rule.createBlock ? latest : rule,
      undefined
    ),
    loading,
    error
  };
}
