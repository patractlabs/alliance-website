import { FC } from 'react';
import styled from 'styled-components';
import { Style } from '../../../shared/style/const';

const Content: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      Two groups, administered on the Polkadot relay chain (possible since it’s very low bandwidth). Fellows (of which
      some are Founders) Members (or “Allies” 复制代码 width: 900px; height: 342px; opacity: 1; font-size: 16px;
      font-family: WorkSans, WorkSans-Regular; font-weight: 400; text-align: left; color: #172026; line-height: 24px;
    </div>
  );
};

export default styled(Content)`
  min-height: 382px;
  border: 1px solid ${Style.border.primary};
  background: #fffbfd;
  border-radius: 16px;
  padding: 20px 40px;
  font-size: 16px;
  color: #172026;
  line-height: 24px;
`;
