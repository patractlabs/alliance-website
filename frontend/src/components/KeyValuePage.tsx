import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { Style } from '../shared/style/const';
import BorderedRow from './BorderedRow';

const KeyValuePage: FC<{ className?: string; pairs: { name: string; render: ReactElement }[] }> = ({
  className,
  pairs
}) => {
  return (
    <div className={className}>
      {pairs.map((pair, index) => (
        <BorderedRow className='key-value-row' key={index} withTop={index === 0} borderColor={Style.border.lighter}>
          <div className='key member-icon'>{pair.name}</div>
          <div className='value member-role'>{pair.render}</div>
        </BorderedRow>
      ))}
    </div>
  );
};

export default styled(KeyValuePage)`
  > .key-value-row {
    padding: 16px;
    > .key {
      width: 30%;
      margin-right: 16px;
      font-weight: 600;
      color: ${Style.label.default};
      line-height: 18px;
    }
    > .value {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${Style.label.primary};
    }
  }
`;
