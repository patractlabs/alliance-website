import { FC } from 'react';
import styled from 'styled-components';
import Goal1Svg from '../../assets/imgs/goal1.svg';
import Goal2Svg from '../../assets/imgs/goal2.svg';
import AnimationWrapper from '../../shared/AnimationWrapper';
import { Style } from '../../shared/style/const';

const Goals: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <div className='title'>
          <h2>This is an industry group with 2 main goals in mind:</h2>
        </div>
        <div className='goals'>
          <AnimationWrapper delay={300}>
            <div className='goal'>
              <div className='goal-icon'>
                <img src={Goal1Svg} alt='' />
              </div>
              <p className='goal-content'>
                Providing a set of ethics regarding unattributed code re-use, launching rival relay chains, the use of
                derogatory language aimed at a particular team or project, scam activities, the use of Polkadot branding
                despite having no credible plans to contribute to the ecosystem, acting against Web3 vision and
                standards, and trademark violations.
              </p>
            </div>
          </AnimationWrapper>
          <AnimationWrapper delay={300}>
            <div className='goal'>
              <div className='goal-icon'>
                <img src={Goal2Svg} alt='' />
              </div>
              <p className='goal-content'>
                Provide recognition and reputation for those teams that contribute something back to the Polkadot
                ecosystem in the form of code, funding, public infrastructure, community building and education.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default styled(Goals)`
  background-color: rgb(250, 250, 251);
  padding: 60px 55px;
  > div {
    max-width: 980px;
    margin: 0 auto;
    > .title {
      h2 {
        margin-bottom: 0px;
        font-size: 24px;
        font-weight: 700;
        color: ${Style.label.primary};
        line-height: 24px;
      }
    }

    > .goals {
      margin-top: 58px;

      > div > .goal {
        padding: 20px 0px;
        display: flex;

        > .goal-icon {
          display: flex;
          align-items: center;
          margin-right: 100px;
          margin-left: 20px;
        }

        > .goal-content {
          flex: 1;
          max-width: 1000px;
          opacity: 0.87;
          font-size: 18px;
          color: ${Style.label.primary};
          line-height: 24px;
          display: flex;
          align-items: center;
          margin-bottom: 0px;
        }
      }
    }
  }
`;
