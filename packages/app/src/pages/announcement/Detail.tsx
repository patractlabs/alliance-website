import React, { FC } from 'react';
import styled from 'styled-components';
import { KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { MemberRole, useAnnouncement } from '../../hooks';

export const badgeImgMap = {
  [MemberRole.FOUNDER]: FounderSvg,
  [MemberRole.FELLOW]: FellowSvg,
  [MemberRole.ALLY]: AllySvg
};

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { motionId } = useParams<{ motionId: string }>();
  const { data: announcement } = useAnnouncement(motionId);

  return (
    <PageSkeleton>
      <div className={className}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/member'>Announcements</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>

        <KeyValuePage
          className='key-values'
          pairs={[
            { name: 'Motion ID', render: <>#{announcement?.cid}</> },
            { name: 'Date', render: <>{announcement?.createTime}</> },
            { name: 'Hash', render: <>{announcement?.motionHash}</> },
            {
              name: 'Content',
              render: <div className='announcement-content'>-</div>
            },
            { name: 'Motion Proposer', render: <></> },
            { name: 'Motion Approvers', render: <></> },
            { name: 'Motion Disapprovers', render: <></> }
          ]}
        ></KeyValuePage>
      </div>
    </PageSkeleton>
  );
};

export default styled(Detail)`
  > .key-values {
    margin-top: 40px;
    > .announcement-content {
      line-height: 20px;
      /* word-break: break-all; */
      /* white-space: pre-wrap; */
      white-space: nowrap;
    }
  }
`;
