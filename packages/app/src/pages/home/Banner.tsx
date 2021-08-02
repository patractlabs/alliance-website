import { FC } from 'react';
import styled from 'styled-components';
import BannerSvg from '../../assets/imgs/banner.svg';
import { Style } from '../../shared/style/const';

const Banner: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className='content'>
        <h1>Fighting for an open source culture and its good ethics.</h1>
      </div>
    </div>
  );
};

export default styled(Banner)`
  height: 680px;
  padding: 124px 0px 95px 0px;
  background: ${Style.bg.primary};

  .content {
    margin: 0 auto;
    max-width: 1122px;
    background-image: url(${BannerSvg});
    background-repeat: repeat;
    display: flex;
    align-items: center;
    height: 100%;

    h1 {
      margin-left: 70px;
      margin-bottom: 0px;
      width: 950px;
      font-size: 56px;
      font-weight: 700;
      color: #ffffff;
      line-height: 66px;
    }
  }
`;
