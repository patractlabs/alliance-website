import React, { FC } from 'react';
import styled from 'styled-components';
import { KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { MemberRole, useBlacklist } from '../../hooks';
import { useParams } from 'react-router-dom';

export const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
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
  const { data: blocked } = useBlacklist(address);

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
            { name: 'Address', render: <>{blocked?.account?.id}</> },
            { name: 'Identity', render: <>{blocked?.account?.display}</> },
            {
              name: 'Website',
              render: <a href={blocked?.website || ''}>{blocked?.website}</a>
            },
            { name: 'Locked', render: <>{}</> },
            { name: 'Added Date', render: <>{blocked?.addTime}</> },
            { name: 'Removed Date', render: <>{blocked?.removeTime}</> }
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
