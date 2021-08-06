import React, { FC } from 'react';
import styled from 'styled-components';
import { useAnnouncements } from '../../../hooks';
import AnnouncementDetail from './Detail';
import Title from './Title';
import MoreSvg from '../../../assets/imgs/link-small.svg';
import { Link } from 'react-router-dom';
import { NoData } from '../../../components';

const MAX = 10;

const RecentAnnouncements: FC<{ className?: string }> = ({ className }) => {
  const { data: annoncements } = useAnnouncements();

  return (
    <div className={className}>
      <div>
        <h2>Recent Announcements</h2>
        <Title />
        {[...annoncements]
          .reverse()
          .slice(0, MAX)
          .map((item, index) => (
            <AnnouncementDetail
              bottom={index === annoncements.length - 1 ? 'none' : 'default'}
              defaultExpanded={index === 0}
              announcement={item}
              key={index}
            />
          ))}
        {!!annoncements && !!annoncements.length && <div className='border'></div>}
        {annoncements.length > MAX && (
          <div className='more-announcements'>
            <Link to='/announcement'>
              <span>More Announcements</span>
              <img src={MoreSvg} alt='' />
            </Link>
          </div>
        )}
        {(!annoncements || !annoncements.length) && <NoData style={{ marginTop: '41px', color: '#8D9298' }} />}
      </div>
    </div>
  );
};

export default styled(RecentAnnouncements)`
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
    > .no-data {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 18px;
    }
    > .more-announcements {
      justify-content: center;
      align-items: center;
      display: flex;
      margin-top: 42px;
      > a {
        span {
          font-size: 12px;
          color: #ffffff;
          margin-right: 2px;
          cursor: pointer;
          &:hover {
            color: #e6007a;
          }
        }
      }
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
