import { ApolloError, gql, useQuery } from '@apollo/client';
import { Account } from './useMember';

const Query = gql`
  query Query($id: String!) {
    account(id: $id) {
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
  }
`;

interface QueryResult<T> {
  account: T;
}

export function useAccount(id?: string): {
  data: Account | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Account>>(Query, { variables: { id } });

  return { data: data?.account, loading, error };
}
