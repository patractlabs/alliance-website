import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Scroll: FC<{ className?: string; target: React.RefObject<HTMLElement> }> = ({ className, target }) => {
  const [thumb, setThumb] = useState<{ height: number; top: number }>({ height: 50, top: 0 });
  const track = useRef<HTMLElement>(null);
  const thumbTop = useRef(0);
  const mousedown = useRef(false);
  const mousedownOffsetTop = useRef(0);

  useEffect(() => {
    const container = target.current;
    const trackDom: HTMLElement | null = track.current;

    if (!container || !trackDom) {
      return;
    }

    const content = container.children[0] as HTMLElement;
    const containerPaddingTop = parseInt(getComputedStyle(container, null).getPropertyValue('padding-top'));
    const containerBorderTop = parseInt(getComputedStyle(container, null).getPropertyValue('border-top'));
    const containerPaddingBottom = parseInt(getComputedStyle(container, null).getPropertyValue('padding-bottom'));
    const containerHeight = container.getBoundingClientRect().height - containerPaddingTop - containerPaddingBottom;
    const contentHeight = content.scrollHeight;
    const trackHeight = trackDom.getBoundingClientRect().height;
    const thumbHeight = (containerHeight / contentHeight) * trackHeight;
    const contentMaxMovable = contentHeight - containerHeight;
    const thumbMaxMovable = trackHeight - thumbHeight;
    console.log('content height', contentHeight, containerHeight);

    const wheelCb = (event: WheelEvent) => {
      const topStart = container.getBoundingClientRect().top + containerBorderTop + containerPaddingTop;
      const moved = topStart - content.getBoundingClientRect().top;
      const rate = moved / contentMaxMovable;
      let top = thumbMaxMovable * rate;

      top = top > thumbMaxMovable ? thumbMaxMovable : top;

      console.log('wheel', event, container.scrollTop);

      // console.log('rate', rate, 'moved',   moved, top > thumbMaxMovable ? thumbMaxMovable : top, 'topStart', topStart);
      setThumb((old) => ({ ...old, top }));
      thumbTop.current = top;
    };
    const mousedownCb = (e: MouseEvent) => {
      console.log('mousedonw');
      mousedown.current = true;
      mousedownOffsetTop.current = e.clientY - trackDom.getBoundingClientRect().top - thumbTop.current;
    };
    const mouseupCb = () => {
      mousedown.current = false;
    };
    const mousemoveCb = (e: MouseEvent) => {
      if (!mousedown.current) {
        return;
      }

      let _thumbTop = e.clientY - trackDom.getBoundingClientRect().top - mousedownOffsetTop.current;
      _thumbTop = _thumbTop > thumbMaxMovable ? thumbMaxMovable : _thumbTop < 0 ? 0 : _thumbTop;
      const rate = _thumbTop / thumbMaxMovable;
      let contentTop = contentMaxMovable * rate;

      console.log('content max movable', contentMaxMovable, rate);
      contentTop = contentTop > contentMaxMovable ? contentMaxMovable : contentTop;
      setThumb((old) => ({
        ...old,
        top: _thumbTop
      }));
      thumbTop.current = _thumbTop;
      container.scrollTop = contentTop;
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

    (trackDom.children[0] as HTMLDivElement).addEventListener('mousedown', mousedownCb, false);
    document.addEventListener('mouseup', mouseupCb, false);
    document.addEventListener('mousemove', mousemoveCb, false);
    content.addEventListener('wheel', wheelCb, false);
    window.addEventListener('resize', resize, false);

    return () => {
      content.removeEventListener('wheel', wheelCb);
      window.removeEventListener('resize', resize, false);
      document.removeEventListener('mouseup', mouseupCb, false);
      document.removeEventListener('mousemove', mousemoveCb, false);
      (trackDom.children[0] as HTMLDivElement).removeEventListener('mousedown', mousedownCb, false);
    };
  }, [target, track]);

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
