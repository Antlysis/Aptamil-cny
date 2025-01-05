import React, { MouseEvent, TouchEvent, useState } from 'react';

import leftArrow from '../../assets/images/left-arrow.png';
import rightArrow from '../../assets/images/right-arrow.png';

interface SlideContent {
  image: string;
  text: React.ReactNode;
  termsText?: boolean;
  footNote?: boolean;
}

interface ModalProps {
  slides: SlideContent[];
  onClose: () => void;
}

function LoginModal({ slides, onClose }: ModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const previousSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) > 75) { // Only trigger if swipe is significant
      if (swipeDistance > 0 && currentSlide < slides.length - 1) {
        nextSlide();
      }
      if (swipeDistance < 0 && currentSlide > 0) {
        previousSlide();
      }
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setMouseEnd(null); // Reset mouseEnd
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setMouseEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && mouseStart && mouseEnd) {
      const dragDistance = mouseStart - mouseEnd;
      
      if (Math.abs(dragDistance) > 75) { // Only trigger if drag is significant
        if (dragDistance > 0 && currentSlide < slides.length - 1) {
          nextSlide();
        }
        if (dragDistance < 0 && currentSlide > 0) {
          previousSlide();
        }
      }
    }
    
    // Reset values
    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[80] flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="login-slider relative flex flex-col p-16 box-border z-[100]">
        <div className="w-full flex flex-col justify-center p-4 modal-container">
          {currentSlide > 0 && (
            <button
              onClick={e => {
                e.stopPropagation(); // Prevent triggering drag events
                previousSlide();
              }}
              className="absolute left-10 arrow-left top-1/2 -translate-y-1/2 p-2 hover:opacity-80 transition-opacity"
              aria-label="Previous slide"
            >
              <img
                src={leftArrow}
                alt="Previous"
                className="w-4 h-auto md:w-6"
                draggable="false"
              />
            </button>
          )}

          {currentSlide < slides.length - 1 && (
            <button
              onClick={e => {
                e.stopPropagation(); // Prevent triggering drag events
                nextSlide();
              }}
              className="absolute right-10 arrow-right top-1/2 -translate-y-1/2 p-2 hover:opacity-80 transition-opacity"
              aria-label="Next slide"
            >
              <img
                src={rightArrow}
                alt="Next"
                className="w-4 h-auto md:w-6"
                draggable="false"
              />
            </button>
          )}

          <div className="flex justify-center w-full h-[60%] slider-size">
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              className="h-full object-contain"
              draggable="false"
            />
          </div>
          <p className="text-base text-center leading-none mt-2 w-[85%] mx-auto">
            {slides[currentSlide].text}
          </p>

          <div className="flex justify-center mt-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-[15px] w-[15px] mx-2 rounded-full ${
                  index === currentSlide ? 'bg-[#A72E32]' : 'bg-white'
                }`}
              ></div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mt-2 w-full">
            <button
              className="login-modal-button text-black font-bold rounded-[11px] w-[70%] h-[40px] my-2"
              onClick={onClose}
            >
              GET STARTED
            </button>
          </div>

          {slides[currentSlide].termsText && (
            <div className="gotham-book text-center text-base">
              <p>*T&C apply.</p>
            </div>
          )}

          {slides[currentSlide].footNote && (
            <div className="gotham-book text-center text-xs">
              <p>*All images are for illustration purposes only.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;