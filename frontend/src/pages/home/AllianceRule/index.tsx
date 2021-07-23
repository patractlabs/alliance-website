import { FC } from 'react';
import styled from 'styled-components';
import { Style } from '../../../shared/style/const';
import { Content } from '../../../components';

const AllianceRule: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <h2>Alliance Rule</h2>
      <div className='ipfs-hash'>
        <span>IPFS Hash</span>
        <a href='https://ipfs.io/ipfs/QmRZdc3mAMXpv6Akz9Ekp1y4vDSjazTx2dCQRkxVy1yUj6'>
          QmRZdc3mAMXpv6Akz9Ekp1y4vDSjazTx2dCQRkxVy1yUj6
        </a>
      </div>
      <div className='content'>
        <Content>
          Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of
          which some are Founders) Members (or “Allies”
        </Content>
      </div>
    </div>
  );
};

export default styled(AllianceRule)`
  background-color: white;
  padding: 80px 0px;
  > h2 {
    text-align: center;
  }
  > .ipfs-hash {
    padding: 30px 0px;
    text-align: center;
    > span {
      margin-right: 16px;
      font-size: 20px;
      font-weight: 700;
      color: ${Style.label.primary};
      line-height: 24px;
    }
    > a {
      font-size: 18px;
      line-height: 21px;
    }
  }

  > .content {
    margin: 0px auto;
    max-width: 980px;
  }
`;
