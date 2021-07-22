import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BorderedTitle, BorderedRow, PageSkeleton, Content } from '../../components';
import { Style } from '../../shared/style/const';
import { Announcement } from '../home/RecentAnnouncements';
import FoldSvg from '../../assets/imgs/fold-primary.svg';
import ExpandSvg from '../../assets/imgs/expand-primary.svg';

const Row = styled(BorderedRow)`
  display: block;
  > .cells {
    display: flex;
  }
  > .content {
    margin-top: 16px;
    min-height: 0px;
  }
`;

const AnnouncementRow: FC<{ className?: string; annoncement: Announcement; defaultExpanded: boolean }> = ({
  className,
  annoncement,
  defaultExpanded
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Row className='table-row' borderColor={Style.border.negative} padding='13px 12px 13px 21px'>
      <div className='cells'>
        <div className='cell motion-id'>
          <a href={`/announcement/${annoncement.motionId}`}>#{annoncement.motionId}</a>
        </div>
        <div className='cell announcement-date'>{annoncement.date}</div>
        <div className='cell announcement-hash'>{annoncement.hash}</div>
        <div className='cell first-line'>
          <span>{annoncement.content.split('\n')[0]}</span>
        </div>
        <div className='cell more'>
          <img onClick={() => setExpanded((old) => !old)} src={expanded ? FoldSvg : ExpandSvg} alt='' />
        </div>
      </div>
      {expanded && (
        <Content style={{ maxHeight: '280px', padding: '16px', lineHeight: '20px' }} className='content'>
          {annoncement.content}
        </Content>
      )}
    </Row>
  );
};

const Announcements: FC<{ className?: string }> = ({ className }) => {
  const annoncements: Announcement[] = [
    {
      motionId: 2,
      hash: '0xasdfasd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code linken Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link'
    },
    {
      motionId: 8,
      hash: '0xasdfs4asd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link'
    },
    {
      motionId: 7,
      hash: '0xa44sdfs4asd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link'
    },
    {
      motionId: 9,
      hash: '0xas3456dfs4asd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link'
    },
    {
      motionId: 6,
      hash: '0xas3456756dfs4asd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link'
    },
    {
      motionId: 5,
      hash: '0xas3456756dfs4dfasd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link'
    },
    {
      motionId: 3,
      hash: '0xas345675667588dfs4asd3412szzxcvzxc',
      date: 'Jun-24-2021',
      content:
        'The problem between Alice and Bob... Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which some are Founders) Members (or “Allies” &#128556) The fellows are initially the same as the founding members of the alliance. These are teams that have a) been around since the early days; b) are of unquestionable reputation and c) have made significant contributions to the ecosystem, preferably code. Every fellow should have one person dedicated full-time to “ecosystem guard”, watching out for and investigating breaches by allies, and also reaching out to new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link near any significant team branding (similar to Star Alliance, the airline alliance) to allow easy verification. All members commit to timely integration of the on-chain information with any of their systems to which it would be relevant to display that new, high-quality ecosystem teams encouraging them to join. Allies and fellows alike must show the Polkadot Alliance badge integrated with their proof-of-membership hot-link or QR-code link'
    }
  ];

  return (
    <PageSkeleton>
      <div className={className}>
        <BorderedTitle className='table-title'>
          <div style={{ width: '19.5%' }}>Motion ID</div>
          <div style={{ width: '18.7%' }}>Date</div>
          <div style={{ width: '30.1%' }}>Hash</div>
          <div>First Line</div>
        </BorderedTitle>
        {annoncements.map((annoncement, index) => (
          <AnnouncementRow key={index} annoncement={annoncement} defaultExpanded={index === 0} />
        ))}
      </div>
    </PageSkeleton>
  );
};

export default styled(Announcements)`
  padding-top: 52px;
  .motion-id {
    width: 19.5%;
  }
  .announcement-date {
    width: 18.7%;
  }
  .announcement-hash {
    width: 30.1%;
  }
  .first-line {
    flex: 1;
    overflow: hidden;
    > span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .more {
    > img {
      cursor: pointer;
    }
  }
`;
