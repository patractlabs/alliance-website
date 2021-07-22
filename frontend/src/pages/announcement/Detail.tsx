import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { KeyValuePage, PageSkeleton } from '../../components';
import { Breadcrumb } from 'antd';
import { MemberRole } from '../home/CurrentMembers/Role';
import { useParams } from 'react-router-dom';
import FounderSvg from '../../assets/imgs/founder-big.svg';
import AllySvg from '../../assets/imgs/ally-big.svg';
import FellowSvg from '../../assets/imgs/fellow-big.svg';
import { Announcement } from '../home/RecentAnnouncements';

export const badgeImgMap = {
  [MemberRole.Founder]: FounderSvg,
  [MemberRole.Fellow]: FellowSvg,
  [MemberRole.Ally]: AllySvg
};

const Detail: FC<{ className?: string }> = ({ className }) => {
  const { motionId } = useParams<{ motionId: string }>();
  const [announcement, setAnnouncement] = useState<Announcement>();

  useEffect(() => {
    setAnnouncement({
      motionId: 2,
      hash: '0xasdfasd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code linken Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link',
      proposer: '',
      approvers: [''],
      disapprovers: ['']
    });
  }, []);

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
            { name: 'Motion ID', render: <>#{announcement?.motionId}</> },
            { name: 'Date', render: <>{announcement?.date}</> },
            { name: 'Hash', render: <>{announcement?.hash}</> },
            {
              name: 'Content',
              render: <div className='announcement-content'>{announcement?.content}</div>
            },
            { name: 'Motion Proposer', render: <>{announcement?.proposer}</> },
            { name: 'Motion Approvers', render: <>{announcement?.approvers.join(' ')}</> },
            { name: 'Motion Disapprovers', render: <>{announcement?.disapprovers.join(' ')}</> }
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
