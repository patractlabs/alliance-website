import { gql, useQuery } from '@apollo/client';
import { Announcement } from './useAnnouncements';

const query = gql`
  query Query($id: String!) {
    announcement(id: $id) {
      id
      cid
      createTime
      motionHash
    }
  }
`;

interface QueryList<T> {
  announcement: T;
}

export function useAnnouncement(id: string) {
  const { data, loading, error } = useQuery<QueryList<Announcement>>(query, { variables: { id } });

  console.log('data', data);
  return { data: data?.announcement, loading, error };
}
