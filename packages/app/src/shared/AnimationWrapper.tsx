import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useScroll } from '../hooks';

interface Props {
  delay?: number;
  type?: 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight';
  style?: React.CSSProperties;
}

const Container = styled.div<{ delay: number }>`
  animation-duration: 800ms;
  animation-delay: ${({ delay }) => delay}ms;
`;

function isInViewPort(el: HTMLElement) {
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;

  return top <= viewPortHeight - 150;
}

const AnimationWrapper: React.FunctionComponent<Props> = ({ children, delay = 300, style, type = 'fadeInUp' }) => {
  const { scrollTop } = useScroll();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [className, setClassName] = useState<string>();

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    if (isInViewPort(wrapperRef.current)) {
      setClassName(`animated ${type}`);
    } else {
      setClassName(className ?? undefined);
    }
  }, [className, scrollTop, type]);

  return (
    <Container
      style={{ visibility: wrapperRef.current && isInViewPort(wrapperRef.current) ? 'visible' : 'hidden', ...style }}
      className={className}
      delay={delay}
      ref={wrapperRef}
    >
      {children}
    </Container>
  );
};

export default React.memo<typeof AnimationWrapper>(AnimationWrapper);
