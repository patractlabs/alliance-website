import { ApolloError, gql, useQuery } from '@apollo/client';
import { Member } from './useMember';

const GET_MEMBERS = gql`
  query {
    members {
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
        type
        status
        joinTime
        elevatedTime
        joinMotionIndex
        elevatedMotionIndex
      }
    }
  }
`;

interface QueryResult<T> {
  members: {
    nodes: T[];
  };
}

export function useMembers(): {
  data: Member[];
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Member>>(GET_MEMBERS);

  return { data: data?.members.nodes || [], loading, error };
}
