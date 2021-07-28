import { gql, useQuery } from '@apollo/client';

const GET_ANNOUNCEMENTS = gql`
  {
    query {
      announcements {
        nodes {
          id
          cid
          createTime
          motionHash
        }
      }
    }
  }
`;

export interface Announcement {
  id: string;
  cid: string;
  createTime: string;
  motionHash: string;
}

interface QueryList<T> {
  query: {
    announcements: {
      nodes: T[];
    };
  };
}

export function useAnnouncements() {
  const { data, loading, error } = useQuery<QueryList<Announcement>>(GET_ANNOUNCEMENTS);

  return { data: data?.query.announcements.nodes, loading, error };
}
