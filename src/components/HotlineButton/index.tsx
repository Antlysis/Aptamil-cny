import { useEffect, useRef, useState } from 'react';

import Draggable from 'react-draggable';

import hotline from '../../assets/images/svg/whatsappLogo.svg';

interface PositionType {
  x: number;
  y: number;
}

interface HotLineButtonProps {
  top?: string;
}

const HotLineButton: React.FC<HotLineButtonProps> = ({ top }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStartPositionXYRef = useRef<PositionType>({
    x: 0,
    y: 0,
  });

  const bounds = {
    top: -(window.innerHeight / 2) + 64,
    bottom: window.innerHeight / 2 - 123,
    left: -window.innerWidth + 50,
    right: 0,
  };

  useEffect(() => {
    setPosition({ x: 0, y: 0 }); // Start at right side
  }, []);

  const handleDragStop = (_: any, data: any) => {
    const THRESHOLD = 2;
    const { x, y } = dragStartPositionXYRef.current;
    const wasDragged =
      Math.abs(data.x - x) > THRESHOLD && Math.abs(data.y - y) > THRESHOLD;

    if (!wasDragged) {
      window.open('https://wa.me/+60149700341', '_blank');
      return;
    }

    // Determine which side to snap to based on screen width
    const screenMiddle = -window.innerWidth / 2;
    const newX = data.x < screenMiddle ? -window.innerWidth + 50 : 0;

    setPosition({ x: newX, y: data.y });
  };

  return (
    <Draggable
      position={position}
      bounds={bounds}
      onStart={(_, data) => {
        dragStartPositionXYRef.current = { x: data.x, y: data.y };
      }}
      onStop={handleDragStop}
    >
      <img
        src={hotline}
        alt="hotline"
        className={`absolute right-0 z-[50] size-[50px] ${top || 'top-1/2'}`}
      />
    </Draggable>
  );
};

export default HotLineButton;
