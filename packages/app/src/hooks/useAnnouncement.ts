import { gql, useQuery } from '@apollo/client';
import { Announcement } from './useAnnouncements';

const query = gql`
  query Query($id: String!) {
    announcement(id: $id) {
      id
      cid
      createTime
      motionIndex
    }
  }
`;

interface QueryResult<T> {
  announcement: T;
}

export function useAnnouncement(id: string) {
  const { data, loading, error } = useQuery<QueryResult<Announcement>>(query, { variables: { id } });

  console.log('useAnnouncement', data);
  return { data: data?.announcement, loading, error };
}
