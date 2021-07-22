import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import { MemberRole } from '../home/CurrentMembers/Role';
import { useParams } from 'react-router-dom';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';

export const badgeImgMap = {
  [MemberRole.Founder]: FounderSvg,
  [MemberRole.Fellow]: FellowSvg,
  [MemberRole.Ally]: AllySvg
};

export interface Blocked {
  address: string;
  identity: string;
  website: string;
  locked: string;
  addedDate: string;
  removedDate: string;
}

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { address } = useParams<{ address: string }>();
  const [blocked, setCandidate] = useState<Blocked>();

  useEffect(() => {
    setCandidate({
      address: '1629Shw6w88GnyXyyUbRtX7YFipQnjScGKcWr1BaRiMhvmAg',
      identity: 'Davaid',
      website: 'www.12345.com',
      locked: '1000 DOT',
      addedDate: 'Jun-24-2021',
      removedDate: 'Jun-24-2021'
    });
  }, []);

  return (
    <PageSkeleton>
      <div className={className}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/blacklist'>Blacklist</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>

        <KeyValuePage
          className='key-values'
          pairs={[
            { name: 'Address', render: <>{blocked?.address}</> },
            { name: 'Identity', render: <>{blocked?.identity}</> },
            {
              name: 'Website',
              render: <a href={blocked?.website}>{blocked?.website}</a>
            },
            { name: 'Locked', render: <>{blocked?.locked}</> },
            { name: 'Added Date', render: <>{blocked?.addedDate}</> },
            { name: 'Removed Date', render: <>{blocked?.removedDate}</> }
          ]}
        ></KeyValuePage>
      </div>
    </PageSkeleton>
  );
};

export default styled(Detail)`
  > .key-values {
    margin-top: 40px;
  }
`;
