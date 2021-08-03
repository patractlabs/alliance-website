import { FC } from 'react';
import styled from 'styled-components';
import { useAnnouncements } from '../../../hooks';
import AnnouncementDetail from './Detail';
import Title from './Title';

const RecentAnnouncements: FC<{ className?: string }> = ({ className }) => {
  const { data: annoncements } = useAnnouncements();

  return (
    <div className={className}>
      <div>
        <h2>Recent Annoncements</h2>
        <Title />
        {[...annoncements]
          .reverse()
          .slice(0, 10)
          .map((item, index) => (
            <AnnouncementDetail
              bottom={index === annoncements.length - 1 ? 'none' : 'default'}
              defaultExpanded={index === 0}
              announcement={item}
              key={index}
            />
          ))}
        <div className='border'></div>
      </div>
    </div>
  );
};

export default styled(RecentAnnouncements)`
  min-height: 891.25px;
  padding: 80px 55px 122px 55px;
  opacity: 1;
  background: linear-gradient(225deg, #2d333d, #172026 100%);

  > div {
    margin: 0px auto;
    max-width: 1160px;

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
  }
`;
