import { Col, Row } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const Title: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className='border'></div>
      <div className='main'>
        <Row className='info'>
          <Col span={6}>Date</Col>
          <Col span={17}>Content</Col>
        </Row>
      </div>
      <div className='border'></div>
    </div>
  );
};

export default styled(Title)`
  > .main {
    padding: 21px 0px;
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    line-height: 14px;

    > .info {
      > div:first-child {
        padding-left: 16px;
      }
    }
  }
  > .border {
    height: 1px;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0.56),
      rgba(255, 255, 255, 0.8) 53%,
      rgba(255, 255, 255, 0.56)
    );
  }
`;
