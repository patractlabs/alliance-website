import { ApolloError, gql, useQuery } from '@apollo/client';

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

export function useAnnouncements(): {
  data: Announcement[];
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Announcement>>(GET_ANNOUNCEMENTS);

  return { data: data?.announcements.nodes || [], loading, error };
}
