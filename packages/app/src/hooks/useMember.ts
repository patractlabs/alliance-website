import { ApolloError, gql, useQuery } from '@apollo/client';

const GET_MEMBER = gql`
  query Query($id: String!) {
    member(id: $id) {
      id
      account {
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
      locked
      type
      status
      joinTime
      elevatedTime
      joinMotionIndex
      elevatedMotionIndex
    }
  }
`;

export enum MemberRole {
  FOUNDER = 'FOUNDER',
  FELLOW = 'FELLOW',
  ALLY = 'ALLY'
}

export enum MemberStatus {
  EXIST = 'EXIST',
  RETIRED = 'RETIRED',
  KICKED = 'KICKED'
}

export interface Account {
  id: string;
  address: string;
  additional: string | null;
  display: string | null;
  displayParent: string | null;
  legal: string | null;
  web: string | null;
  riot: string | null;
  email: string | null;
  pgpFingerprint: string | null;
  image: string | null;
  twitter: string | null;
  judgements: string | null;
}

export interface Member {
  id: string;
  account: Account;
  locked: string | null;
  type: MemberRole;
  status: MemberStatus;
  joinTime: string | null;
  elevatedTime: string | null;
  joinMotionIndex: number | null;
  elevatedMotionIndex: number | null;
}

interface QueryResult<T> {
  member: T;
}

// fix: addres not id
export function useMember(id: string): {
  data: Member | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { data, loading, error } = useQuery<QueryResult<Member>>(GET_MEMBER, { variables: { id } });

  return { data: data?.member, loading, error };
}
