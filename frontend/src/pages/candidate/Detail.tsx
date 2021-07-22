import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import { MemberRole } from '../home/CurrentMembers/Role';
import { useParams } from 'react-router-dom';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { CandidateType } from './';

export const badgeImgMap = {
  [MemberRole.Founder]: FounderSvg,
  [MemberRole.Fellow]: FellowSvg,
  [MemberRole.Ally]: AllySvg
};

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { motionId } = useParams<{ motionId: string }>();
  const [candidate, setCandidate] = useState<CandidateType>();

  useEffect(() => {
    setCandidate({
      nominator: 'Cycan',
      locked: '1000 DOT',
      accountID: 'sH768Ct9LYgqpn222eYEftRCuZZz9rvW7zwfjrWAEzwGLp4H',
      identity: 'xxx',
      website: 'https://cycan.network',
      appliedDate: 'Jun-10-2021'
    });
  }, []);

  return (
    <PageSkeleton>
      <div className={className}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/candidate'>Candidates</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>

        <KeyValuePage
          className='key-values'
          pairs={[
            { name: 'AccountID', render: <>{candidate?.accountID}</> },
            { name: 'Identity', render: <>{candidate?.identity}</> },
            {
              name: 'Website',
              render: <a href={candidate?.website}>{candidate?.website}</a>
            },
            { name: 'Locked', render: <>{candidate?.locked}</> },
            { name: 'Nominator', render: <>{candidate?.nominator}</> },
            { name: 'Applied Date (Ordinary to Candidate)', render: <>{candidate?.appliedDate}</> }
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
