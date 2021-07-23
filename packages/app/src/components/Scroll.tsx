import { log } from 'console';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Scroll: FC<{ className?: string; target: React.RefObject<HTMLElement> }> = ({ className, target }) => {
  const [thumb, setThumb] = useState<{ height: number; top: number }>({ height: 50, top: 0 });
  const track = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = target.current;

    if (!container || !track.current) {
      return;
    }

    const content = container.children[0] as HTMLElement;
    const containerPaddingTop = parseInt(getComputedStyle(container, null).getPropertyValue('padding-top'));
    const containerBorderTop = parseInt(getComputedStyle(container, null).getPropertyValue('border-top'));
    const containerPaddingBottom = parseInt(getComputedStyle(container, null).getPropertyValue('padding-bottom'));
    const containerHeight =
      container?.getBoundingClientRect().height - containerPaddingTop - containerPaddingBottom || 0;
    const contentHeight = content.scrollHeight;
    const trackHeight = track.current.getBoundingClientRect().height;
    const thumbHeight = (containerHeight / contentHeight) * trackHeight;
    const contentMaxMovable = contentHeight - containerHeight;
    const thumbMaxMovable = trackHeight - thumbHeight;
    const cb = (event: WheelEvent) => {
      const topStart = container.getBoundingClientRect().top + containerBorderTop + containerPaddingTop;
      const moved = topStart - content.getBoundingClientRect().top;
      const rate = moved / contentMaxMovable;
      const top = thumbMaxMovable * rate;

      console.log('rate', rate, 'moved', moved, top > thumbMaxMovable ? thumbMaxMovable : top, 'topStart', topStart);
      setThumb((old) => ({ ...old, top: top > thumbMaxMovable ? thumbMaxMovable : top }));
    };
    const resize = (e: Event) => console.log('resize', e);
    console.log(
      'container hegiht',
      containerHeight,
      'content height',
      contentHeight,
      'contentMaxMovable',
      contentMaxMovable,
      'thumbMaxMovable',
      thumbMaxMovable,
      'containerBorderTop',
      containerBorderTop,
      'containerPaddingTop',
      containerPaddingTop
    );

    setThumb((old) => ({ ...old, height: thumbHeight }));

    content.addEventListener('wheel', cb, false);
    window.addEventListener('resize', resize, false);

    return () => {
      content.removeEventListener('wheel', cb);
      window.removeEventListener('resize', resize, false);
    };
  }, [target]);

  return (
    <div ref={track as any} className={className}>
      <div style={{ height: thumb?.height, transform: `translateY(${thumb?.top}px)` }}></div>
    </div>
  );
};

export default styled(Scroll)`
  width: 12px;
  background: #fbf4f7;
  border-radius: 7px;
  > div {
    width: 8px;
    margin: 0 auto;
    height: 72px;
    opacity: 0.5;
    background: #172026;
    border-radius: 5px;
  }
`;
