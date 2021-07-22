import styled from 'styled-components';
import { Style } from '../shared/style/const';

const BorderedRow = styled.div<{ top?: boolean; bottom?: boolean; borderColor: string; padding: string }>`
  display: flex;
  padding: ${(props) => props.padding};
  border-top: ${(props) => (props.top ? '1px solid ' + props.borderColor : '')};
  border-bottom: ${(props) => (!props.bottom ? '1px solid ' + props.borderColor : '')};

  &:hover {
    background-color: ${Style.bg.second};
  }
  .cell {
    &:first-child {
      padding-left: 0px;
    }
    &:last-child {
      padding-right: 0px;
    }
    padding: 0px 6px;
    display: flex;
    align-items: center;
  }
`;
export default BorderedRow;
