import styled from 'styled-components';
import { Row } from 'antd';
import { Style } from '../shared/style/const';

const BorderedTitle = styled(Row)`
  padding: 8px 12px 8px 21px;
  border-top: 1px solid ${Style.border.second};
  border-bottom: 1px solid ${Style.border.second};
  font-size: 12px;
  font-weight: 700;
  color: ${Style.label.primary};
  line-height: 14px;

  > div {
    display: flex;
    align-items: center;
  }
`;

export default BorderedTitle;
