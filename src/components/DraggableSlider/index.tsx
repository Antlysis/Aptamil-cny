import { useEffect, useRef } from 'react';

import sliderImg from '../../assets/images/gatcha-slide.png';

interface DraggableSliderProps {
  handleTrigger: () => void;
  canPlay: boolean;
  handleDown: (event: React.PointerEvent) => void;
  handleUp2: () => void;
}

const DraggableSlider = ({
  handleTrigger,
  canPlay,
  handleDown,
  handleUp2,
}: DraggableSliderProps) => {
  const parent = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const offset = useRef({
    dx: 0,
  });
  const startPos = useRef({ x: 0 });
  const pointerId = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (parent && parent.current) {
        const parentCur = parent.current;
        parentCur.removeEventListener('pointermove', handlePointerMove);
        parentCur.removeEventListener('pointerup', handlePointerUp);
      }
    };
  }, []);

  const handlePointerMove = (e: PointerEvent) => {
    const handleCur = handle.current;
    const parentCur = parent.current;
    if (!handleCur || !parentCur) {
      return;
    }

    const parentBound: DOMRect = parentCur.getBoundingClientRect();
    const handleBound: DOMRect = handleCur.getBoundingClientRect();

    const odx = Math.floor(e.clientX - startPos.current.x);
    const dx = Math.min(Math.max(odx, 0), parentBound.width - handleBound.width);
    handleCur.style.transform = `translate(${dx}px, 0px)`;
    const length = (e.clientX - parentBound.left) / parentBound.width;
    const barPercentage = Math.min(Math.max(length, 0) * 100, 100);

    parentCur.style.setProperty('--handle--position', `${barPercentage}%`);
    offset.current = { dx };
    if (barPercentage >= 96) {
      handleTrigger();
      handlePointerUp();
    }
  };

  const handlePointerUp = () => {
    handleUp2();
    const handleCur = handle.current;
    const parentCur = parent.current;
    if (!handleCur || !parentCur) {
      return;
    }
    console.log('mouseUp');
    handleCur.style.transform = `translate(0px, 0px)`;
    parentCur.style.setProperty('--handle--position', `0%`);
    offset.current = { dx: 0 };
    // console.log('mouseUp: ', pointerId);
    handleCur.releasePointerCapture(pointerId.current);
    parentCur.removeEventListener('pointermove', handlePointerMove);
    parentCur.removeEventListener('pointerup', handlePointerUp);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(offset.current.dx);
    handleDown(e);
    console.log('mouse');
    const handleCur = handle.current;
    const parentCur = parent.current;
    if (!handleCur || !parentCur) {
      return;
    }

    handleCur.setPointerCapture(e.pointerId);

    startPos.current = {
      x: e.clientX - offset.current.dx,
    };
    // console.log('mouseDown: ', e.pointerId);
    pointerId.current = e.pointerId;
    parentCur.addEventListener('pointermove', handlePointerMove);
    parentCur.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div ref={parent} className="handle relative z-10 flex h-[2vw] w-full items-center">
      <img src={sliderImg} className="absolute z-[-1]"></img>
      <div
        ref={handle}
        onPointerDown={canPlay ? handlePointerDown : () => {}}
        className={`relative size-[1.5rem] touch-none rounded-[50%] ${canPlay ? 'bg-[#7D1A21]' : 'bg-gray-500'}`}
      ></div>
    </div>
  );
};
export default DraggableSlider;
