import { useEffect, useRef } from 'react';

import hotlineImage from '../../assets/images/svg/whatsappLogo.svg';

interface HotLineButtonProps {
  noHeader?: boolean;
  noFooter?: boolean;
}

const HotLineButton = ({ noHeader, noFooter }: HotLineButtonProps) => {
  const threshold = 2;
  const parentRef = useRef<HTMLDivElement>(null);
  const eleRef = useRef<HTMLDivElement>(null);
  const offset = useRef({
    dx: 0,
    dy: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current && eleRef.current) {
        const parentBounds = parentRef.current.getBoundingClientRect();
        const draggableBounds = eleRef.current.getBoundingClientRect();

        if (parentBounds.width <= offset.current.dx + draggableBounds.width) {
          const diff = parentBounds.width - (offset.current.dx + draggableBounds.width);
          const odx = offset.current.dx + diff;
          eleRef.current.style.transform = `translate(${odx}px, ${offset.current.dy}px)`;
          offset.current = {
            dx: odx,
            dy: offset.current.dy,
          };
        } else if (parentBounds.width / 2 < offset.current.dx) {
          const diff = parentBounds.width - (offset.current.dx + draggableBounds.width);
          const odx = offset.current.dx + diff;
          eleRef.current.style.transform = `translate(${odx}px, ${offset.current.dy}px)`;
          offset.current = {
            dx: odx,
            dy: offset.current.dy,
          };
        }

        if (parentBounds.height <= offset.current.dy + draggableBounds.height) {
          const diff = parentBounds.height - (offset.current.dy + draggableBounds.height);
          const ody = offset.current.dy + diff;
          eleRef.current.style.transform = `translate(${offset.current.dx}px, ${ody}px)`;
          offset.current = {
            dx: offset.current.dx,
            dy: ody,
          };
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (parentRef.current && eleRef.current) {
      const ele = eleRef.current;
      const parBound = parentRef.current.getBoundingClientRect();
      const eleBound = eleRef.current.getBoundingClientRect();
      if (!offset.current.dx && !offset.current.dy) {
        const odx = Number(parBound.width - eleBound.width);
        const ody = Number(parBound.height - eleBound.height) / 2;
        ele.style.transform = `translate(${odx}px, ${ody}px)`;
        offset.current = { dx: odx, dy: ody };
      }
    }
  }, []);
  console.log('Render');

  const handleMouseDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const ele = eleRef.current;
    const par = parentRef.current;
    if (!ele || !par) {
      return;
    }

    const parBound: DOMRect = par.getBoundingClientRect();
    const eleBound: DOMRect = ele.getBoundingClientRect();

    const startPos = {
      x: e.clientX - offset.current.dx,
      y: e.clientY - offset.current.dy,
    };

    const startPosMouse = {
      x: e.clientX,
      y: e.clientY,
    };
    const handleMouseMove = (e: PointerEvent) => {
      const odx = e.clientX - startPos.x;
      const ody = e.clientY - startPos.y;

      const dx = Math.min(Math.max(odx, 0), parBound.width - eleBound.width); // Limit the x-axis
      const dy = Math.min(Math.max(ody, 0), parBound.height - eleBound.height);

      ele.style.transform = `translate(${dx}px, ${dy}px)`;

      offset.current = { dx, dy };
    };

    const handleMouseUp = (eventMouseUp: PointerEvent) => {
      const finalPosMouse = {
        x: eventMouseUp.clientX,
        y: eventMouseUp.clientY,
      };
      const wasDragged =
        Math.abs(finalPosMouse.x - startPosMouse.x) > threshold ||
        Math.abs(finalPosMouse.y - startPosMouse.y) > threshold;
      if (!wasDragged) {
        window.open(
          'https://wa.me/60327876292?text=Hi%2C%20i%27d%20like%20to%20find%20out%20more',
          '_blank'
        );
      }
      const newX =
        finalPosMouse.x >= window.innerWidth / 2 ? parBound.width - eleBound.width : 0;
      ele.style.transform = `translate(${newX}px, ${offset.current.dy}px)`;
      offset.current = { dx: newX, dy: offset.current.dy };

      document.removeEventListener('pointermove', handleMouseMove);
      document.removeEventListener('pointerup', handleMouseUp);
    };

    document.addEventListener('pointermove', handleMouseMove);
    document.addEventListener('pointerup', handleMouseUp);
  };

  return (
    <div
      className={`container pointer-events-none fixed z-[50] m-auto w-full max-w-[600px]
      ${
        noFooter && noHeader
          ? 'special-class'
          : noFooter
            ? 'top-0 mb-[73px] h-[calc(100vh-73px)] box-border'
            : noHeader
              ? 'top-0 mt-16 h-[calc(100vh-4rem)] box-border'
              : 'h-screen'
      }`}
      style={{ backgroundColor: 'transparent' }}
      ref={parentRef}
    >
      <div
        className="pointer-events-auto absolute size-[50px] touch-none"
        ref={eleRef}
        onPointerDown={handleMouseDown}
      >
        <img src={hotlineImage} alt="hotlineImage"></img>
      </div>
    </div>
  );
};

export default HotLineButton;
