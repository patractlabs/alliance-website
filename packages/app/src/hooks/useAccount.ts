import { gql, useQuery } from '@apollo/client';
import { Account } from './useMember';

const Query = gql`
  query Query($id: String!) {
    account(id: $id) {
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
  }
`;

interface QueryResult<T> {
  account: T;
}

export function useAccount(id?: string) {
  const { data, loading, error } = useQuery<QueryResult<Account>>(Query, { variables: { id } });

  console.log('data', data);
  return { data: data?.account, loading, error };
}
