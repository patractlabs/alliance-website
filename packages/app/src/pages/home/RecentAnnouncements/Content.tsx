import { CSSProperties, FC, useRef } from 'react';
import styled from 'styled-components';
import { Style } from '../../../shared/style/const';
import Scroll from '../../../components/Scroll';

const Wrapper = styled.div`
  height: 382px;
  border: 1px solid ${Style.border.primary};
  background: ${Style.bg.primary};
  font-size: 14px;
  opacity: 0.87;
  line-height: 18px;
  color: #ffffff;

  > div {
    display: flex;
    height: 100%;
    > .content-main {
      padding: 16px;
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

  return (
    <Wrapper className={className} style={style}>
      <div>
        <div ref={target as any} className='content-main allicance-cutsom-scroll'>
          <div>{children}</div>
        </div>
        <Scroll
          thumbStyle={{ background: 'rgba(41, 49, 55)' }}
          trackStyle={{ background: 'rgb(82, 89, 94)' }}
          className='scrollbar'
          target={target}
        />
      </div>
    </Wrapper>
  );
};

export default Content;
