import { FC } from 'react';
import styled from 'styled-components';
import Content from './Content';

const AllianceRule: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <h2>Alliance Rule</h2>
      <div className='ipfs-hash'>
        <span>IPFS Hash</span>
        <a>QmSsw6EcnwEiTT9c4rnAGeSENvsJMepNHmbrgi2S9bXNJr</a>
      </div>
      <div className='content'>
        <Content />
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
      color: #172026;
      line-height: 24px;
    }
    > a {
      font-size: 18px;
      color: #0074f2;
      line-height: 21px;
    }
  }

  > .content {
    margin: 0px auto;
    width: 76.5%;
  }
`;
