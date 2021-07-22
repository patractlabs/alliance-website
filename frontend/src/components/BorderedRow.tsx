import styled from 'styled-components';
import { Style } from '../shared/style/const';

const BorderedRow = styled.div<{ withTop?: boolean; widthoutBottom?: boolean; borderColor: string; padding?: string }>`
  display: flex;
  padding: ${(props) => props.padding};
  border-top: ${(props) => (props.withTop ? '1px solid ' + props.borderColor : '')};
  border-bottom: ${(props) => (!props.widthoutBottom ? '1px solid ' + props.borderColor : '')};

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
    > a,
    > span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    align-items: center;
  }
`;
export default BorderedRow;
