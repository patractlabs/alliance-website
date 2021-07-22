import styled from 'styled-components';

const BorderedRow = styled.div<{ top?: boolean; bottom?: boolean; borderColor: string; padding: string }>`
  display: flex;
  padding: ${(props) => props.padding};
  border-top: ${(props) => (props.top ? '1px solid ' + props.borderColor : '')};
  border-bottom: ${(props) => (!props.bottom ? '1px solid ' + props.borderColor : '')};

  > div {
    display: flex;
    align-items: center;
  }
`;
export default BorderedRow;
