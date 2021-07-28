import { CSSProperties, FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Style } from '../../shared/style/const';
import Scroll from '../../components/Scroll';

const Wrapper = styled.div`
  height: 280px;
  border: 1px solid ${Style.border.primary};
  background: #fffbfd;
  border-radius: 16px;
  font-size: 16px;
  line-height: 24px;
  color: ${Style.label.primary};
  padding: 16px 0px;

  > div {
    display: flex;
    height: 100%;
    > .content-main {
      padding: 0px 16px;
      flex: 1;
    }
    > .scrollbar {
      height: 100%;
      margin-right: 1px;
    }
  }
`;

const Content: FC<{ className?: string; style?: CSSProperties }> = ({ className, style, children }) => {
  const target = useRef<HTMLElement>(null);

  useEffect(() => console.log('target.current', target.current), []);

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
