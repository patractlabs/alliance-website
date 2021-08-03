import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Scroll: FC<{
  className?: string;
  target: React.RefObject<HTMLElement>;
  thumbStyle?: CSSProperties;
  trackStyle?: CSSProperties;
  updateSignal?: number;
}> = ({ className, target, thumbStyle, trackStyle, updateSignal }) => {
  const [thumb, setThumb] = useState<{ height: number; top: number; smooth: boolean }>({
    height: 0,
    top: 0,
    smooth: false
  });
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

    const containerPaddingTop = parseInt(getComputedStyle(container, null).getPropertyValue('padding-top'));
    const containerBorderTop = parseInt(getComputedStyle(container, null).getPropertyValue('border-top'));
    const containerPaddingBottom = parseInt(getComputedStyle(container, null).getPropertyValue('padding-bottom'));
    const containerHeight = container.getBoundingClientRect().height - containerPaddingTop - containerPaddingBottom;
    const content = container.children[0] as HTMLElement;
    const contentHeight = content.scrollHeight;
    const trackHeight = trackDom.getBoundingClientRect().height;
    const thumbHeight = (containerHeight / contentHeight) * trackHeight;
    const contentMaxMovable = contentHeight - containerHeight;
    const thumbMaxMovable = trackHeight - thumbHeight;

    // a &&
    //   console.log(
    //     a,
    //     container.clientHeight,
    //     container.getBoundingClientRect(),
    //     'container hegiht',
    //     containerHeight,
    //     'content height',
    //     contentHeight,
    //     'contentMaxMovable',
    //     contentMaxMovable,
    //     'trackHeight',
    //     trackHeight,
    //     'thumbHeight',
    //     thumbHeight,
    //     'thumbMaxMovable',
    //     thumbMaxMovable,
    //     'containerBorderTop',
    //     containerBorderTop,
    //     'containerPaddingTop',
    //     containerPaddingTop,
    //     { height: thumbHeight },
    //     trackDom.getBoundingClientRect(),
    //     trackDom
    //   );
    if (containerHeight >= contentHeight) {
      return;
    }
    const wheelCb = () => {
      const topStart = container.getBoundingClientRect().top + containerBorderTop + containerPaddingTop;
      const moved = topStart - content.getBoundingClientRect().top;
      const rate = moved / contentMaxMovable;
      let top = thumbMaxMovable * rate;

      top = top > thumbMaxMovable ? thumbMaxMovable : top;

      setThumb((old) => ({ ...old, top, smooth: true }));
      thumbTop.current = top;
    };
    const mousedownCb = (e: MouseEvent) => {
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

      // console.log('content max movable', contentMaxMovable, rate);
      contentTop = contentTop > contentMaxMovable ? contentMaxMovable : contentTop;
      setThumb((old) => ({
        ...old,
        top: _thumbTop,
        smooth: false
      }));
      thumbTop.current = _thumbTop;
      container.scrollTop = contentTop;
    };
    // const resize = (e: Event) => console.log('resize', e);

    setThumb((old) => ({ ...old, height: thumbHeight, smooth: false }));

    (trackDom.children[0] as HTMLDivElement).addEventListener('mousedown', mousedownCb, false);
    document.addEventListener('mouseup', mouseupCb, false);
    document.addEventListener('mousemove', mousemoveCb, false);
    content.addEventListener('wheel', wheelCb, false);
    // window.addEventListener('resize', resize, false);

    return () => {
      content.removeEventListener('wheel', wheelCb);
      // window.removeEventListener('resize', resize, false);
      document.removeEventListener('mouseup', mouseupCb, false);
      document.removeEventListener('mousemove', mousemoveCb, false);
      (trackDom.children[0] as HTMLDivElement).removeEventListener('mousedown', mousedownCb, false);
    };
  }, [target, track, trackStyle, updateSignal]);

  return (
    <div style={{ ...thumbStyle, width: thumb.height <= 0 ? '0px' : '12px' }} ref={track as any} className={className}>
      <div
        style={{
          ...trackStyle,
          transition: thumb?.smooth ? 'transform 0.08s' : '',
          height: thumb?.height,
          transform: `translateY(${thumb?.top}px)`
        }}
      ></div>
    </div>
  );
};

export default styled(Scroll)`
  user-select: none;
  background: #fbf4f7;
  border-radius: 7px;
  margin-right: 1px;
  > div {
    width: 8px;
    margin: 0 auto;
    opacity: 0.5;
    background: #172026;
    border-radius: 5px;
  }
`;
