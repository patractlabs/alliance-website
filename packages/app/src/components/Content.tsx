import styled from 'styled-components';
import { Style } from '../shared/style/const';

const Content = styled.div`
  min-height: 382px;
  border: 1px solid ${Style.border.primary};
  background: #fffbfd;
  border-radius: 16px;
  padding: 20px 40px;
  font-size: 16px;
  color: ${Style.label.primary};
  line-height: 24px;
  overflow-y: auto;
`;

export default Content;
