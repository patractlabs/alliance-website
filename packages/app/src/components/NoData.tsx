import React, { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import NoDataSvg from '../assets/imgs/no-data.svg';

const NoData: FC<{
  className?: string;
  span?: string;
  style?: CSSProperties;
}> = ({ className, span = 'Empty', style }) => {
  return (
    <div className={className} style={style}>
      <img src={NoDataSvg} alt='' />
      <div>{span}</div>
    </div>
  );
};

export default styled(NoData)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.56;
  color: #172026;
  img {
    margin-bottom: 8px;
  }
`;
