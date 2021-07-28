import { gql, useQuery } from '@apollo/client';

const GET_MEMBER = gql`
  query Query($id: String!) {
    member(id: $id) {
      id
      account {
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
  legal: string | null;
  web: string | null;
  riot: string | null;
  email: string | null;
  pgpFingerprint: string | null;
  image: string | null;
  twitter: string | null;
}

export interface Member {
  id: string;
  account: Account;
  locked: number | null;
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
export function useMember(id: string) {
  const { data, loading, error } = useQuery<QueryResult<Member>>(GET_MEMBER, { variables: { id } });

  console.log('data', data);
  return { data: data?.member, loading, error };
}
