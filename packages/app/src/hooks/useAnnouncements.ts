import { ApolloError, gql, useQuery } from '@apollo/client';

const GET_ANNOUNCEMENTS = gql`
  query {
    announcements {
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

export interface Announcement {
  id: string;
  cid: string;
  createBlock?: string;
  createExtrinsic?: number;
  createTime: string;
  motionIndex: number;
  content: string | null;
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
