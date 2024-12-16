import { useRef } from 'react';

import Draggable from 'react-draggable';

import hotline from '../../assets/images/svg/whatsappLogo.svg';

interface positionType {
  x: number;
  y: number;
}

const HotLineButton = () => {
  const dragStartPositionXYRef = useRef<positionType>({
    x: 0,
    y: 0,
  });
  return (
    <Draggable
      bounds="parent"
      onStart={(_, data) => {
        dragStartPositionXYRef.current = { x: data.x, y: data.y };
      }}
      onStop={(_, data) => {
        const THRESHOLD = 2;
        const { x, y } = dragStartPositionXYRef.current ?? { x: 0, y: 0 };
        const wasDragged =
          Math.abs(data.x - x) > THRESHOLD && Math.abs(data.y - y) > THRESHOLD;
        if (!wasDragged) {
          window.open('https://wa.me/+60149700341', '_blank');
        }
      }}
    >
      <img
        src={hotline}
        alt="hotline"
        className="absolute right-0 top-1/2 z-[100] size-[50px]"
      ></img>
    </Draggable>
  );
};

export default HotLineButton;
