import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Style } from '../../shared/style/const';
import lottie from 'lottie-web';
import AnimationWrapper from '../../shared/AnimationWrapper';

const Banner: FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg' as any,
      loop: true,
      autoplay: true,
      path: '/static/media/animation/01/data.json'
    });
    return () => lottie.destroy();
  }, []);

  return (
    <div className={className}>
      <div className='col-animation'>
        <div ref={ref}></div>
      </div>
      <div className='content'>
        <AnimationWrapper delay={300}>
          <h1>Fighting for an open source culture and its good ethics.</h1>
        </AnimationWrapper>
      </div>
    </div>
  );
};

export default styled(Banner)`
  height: 680px;
  position: relative;
  background: ${Style.bg.primary};

  > .col-animation {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 680px;
    left: 0px;
    right: 0px;
    > div {
      width: 1280px;
      height: 680px;
    }
  }
  .content {
    padding: 95px 0px 95px 0px;
    margin: 0 auto;
    max-width: 1122px;
    display: flex;
    align-items: center;
    height: 100%;

    h1 {
      margin-left: 70px;
      margin-bottom: 0px;
      width: 565px;
      font-size: 56px;
      font-weight: 700;
      color: #ffffff;
      line-height: 66px;
    }
  }
`;
