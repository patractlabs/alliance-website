import { FC } from 'react';
import styled from 'styled-components';
import AnnouncementDetail from './Detail';
import Title from './Title';

export interface Announcement {
  date: string;
  content: string;
  motionId: number;
  hash: string;
}
const RecentAnnouncements: FC<{ className?: string }> = ({ className }) => {
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
    <div className={className}>
      <h2>Recent Annoncements</h2>
      <Title />
      {annoncements.map((item, index) => (
        <AnnouncementDetail
          bottom={index === annoncements.length - 1 ? 'none' : 'default'}
          defaultExpanded={index === 0}
          annoncement={item}
          key={index}
        />
      ))}
      <div className='border'></div>
    </div>
  );
};

export default styled(RecentAnnouncements)`
  padding: 80px 160px 122px 160px;
  opacity: 1;
  background: linear-gradient(225deg, #2d333d, #172026 100%);

  > .border {
    height: 1px;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0.56),
      rgba(255, 255, 255, 0.8) 53%,
      rgba(255, 255, 255, 0.56)
    );
  }
  > h2 {
    color: white;
    text-align: center;
    margin-bottom: 60px;
    font-size: 40px;
    font-weight: 700;
    line-height: 47px;
  }
`;
