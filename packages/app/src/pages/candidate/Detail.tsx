import React, { FC } from 'react';
import styled from 'styled-components';
import { KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { MemberRole, useCandidate } from '../../hooks';
import { useParams } from 'react-router-dom';
import { formatBalance } from '@polkadot/util';
import { formatDate } from '../../core/util/format-date';

export const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { accountId } = useParams<{ accountId: string }>();
  const { data: candidate } = useCandidate(accountId);

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
            { name: 'AccountID', render: <>{candidate?.id || '-'}</> },
            { name: 'Identity', render: <>{candidate?.account.display || '-'}</> },
            {
              name: 'Website',
              render: !candidate?.account.web ? (
                <></>
              ) : (
                <a href={candidate.account.web || ''}>{candidate.account.web}</a>
              )
            },
            { name: 'Locked', render: <>{formatBalance(candidate?.locked || undefined, {}, 10)}</> },
            { name: 'Nominator', render: <>{candidate?.nominator?.display || '-'}</> },
            { name: 'Applied Date (Ordinary to Candidate)', render: <>{formatDate(candidate?.applyTime)}</> }
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
