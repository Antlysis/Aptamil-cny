import { useRef } from 'react';
import Draggable from 'react-draggable';
import hotline from '../../assets/images/svg/whatsappLogo.svg';

interface PositionType {
  x: number;
  y: number;
}

interface HotLineButtonProps {
  top?: string;
}

const HotLineButton: React.FC<HotLineButtonProps> = () => {
  const dragStartPositionXYRef = useRef<PositionType>({
    x: 0,
    y: 0,
  });

  return (
    <div className="fixed inset-x-0 top-[4.5rem] bottom-[73px] z-[50]">
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
          className="absolute right-0 z-[50] size-[50px] cursor-move"
        />
      </Draggable>
    </div>
  );
};

export default HotLineButton;