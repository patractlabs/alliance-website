import { gql, useQuery } from '@apollo/client';

const GET_ANNOUNCEMENTS = gql`
  query {
    announcements {
      nodes {
        id
        cid
        createTime
        motionIndex
      }
    }
  }
`;

export interface Announcement {
  id: string;
  cid: string;
  createTime: string;
  motionIndex: number;
}

interface QueryResult<T> {
  announcements: {
    nodes: T[];
  };
}

export function useAnnouncements() {
  const { data, loading, error } = useQuery<QueryResult<Announcement>>(GET_ANNOUNCEMENTS);

  console.log('useAnnouncements', data);
  return { data: data?.announcements.nodes || [], loading, error };
}
