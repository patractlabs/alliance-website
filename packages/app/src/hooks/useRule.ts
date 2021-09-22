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
  createBlock?: string;
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
        latest && latest.createBlock && rule.createBlock && compareIntString(latest.createBlock, rule.createBlock) > 0
          ? latest
          : rule,
      undefined
    ),
    loading,
    error
  };
}

function compareIntString(a: string, b: string): 1 | -1 | 0 {
  a = `${a}`;
  b = `${b}`;

  if (a.length > b.length) {
    return 1;
  } else if (a.length < b.length) {
    return -1;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) {
      return 1;
    } else if (a[i] < b[i]) {
      return -1;
    }
  }

  return 0;
}
