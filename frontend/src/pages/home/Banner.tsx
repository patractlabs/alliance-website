import { FC } from 'react';
import styled from 'styled-components';
import BannerSvg from '../../assets/imgs/banner.svg';
import { Style } from '../../shared/style/const';

const Banner: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className='content'>
        <h1>Fighting for an oppensource culture and its good ethics.</h1>
      </div>
    </div>
  );
};

export default styled(Banner)`
  height: 680px;
  padding: 124px 80px 95px 80px;
  background: ${Style.bg.primary};

  .content {
    background-image: url(${BannerSvg});
    background-repeat: repeat;
    display: flex;
    align-items: center;
    height: 100%;

    h1 {
      width: 572px;
      font-size: 56px;
      font-weight: 700;
      color: #ffffff;
      line-height: 66px;
      margin-left: 70px;
    }
  }
`;
