import { CSSProperties, FC, useRef } from 'react';
import styled from 'styled-components';
import { Style } from '../shared/style/const';
import Scroll from './Scroll';

const Wrapper = styled.div`
  height: 100%;
  border: 1px solid ${Style.border.primary};
  background: #fffbfd;
  border-radius: 16px;
  font-size: 16px;
  line-height: 24px;
  color: ${Style.label.primary};
  padding: 30px 0px;

  > div {
    display: flex;
    height: 100%;
    > .content-main {
      flex: 1;
      padding: 0px 40px;
    }
    > .scrollbar {
      height: 100%;
      margin-right: 1px;
    }
  }
`;

const Content: FC<{ className?: string; style?: CSSProperties }> = ({ className, style, children }) => {
  const target = useRef<HTMLElement>(null);

  return (
    <Wrapper className={className} style={style}>
      <div>
        <div ref={target as any} className='content-main allicance-cutsom-scroll'>
          <div>{children}</div>
        </div>
        <Scroll className='scrollbar' target={target} />
      </div>
    </Wrapper>
  );
};

export default Content;
