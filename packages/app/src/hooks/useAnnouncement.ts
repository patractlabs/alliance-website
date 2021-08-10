import { ApolloError, gql, useQuery } from '@apollo/client';
import { Announcement } from './useAnnouncements';

const query = gql`
  query Query($id: String!) {
    announcement(id: $id) {
      id
      cid
      createBlock
      createExtrinsic
      createTime
      motionIndex
      content
    }
  }
`;

interface QueryResult<T> {
  announcement: T;
}

export function useAnnouncement(id: string): {
  data: Announcement | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Announcement>>(query, { variables: { id } });

  return { data: data?.announcement, loading, error };
}
