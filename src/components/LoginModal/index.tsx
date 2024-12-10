import React, { TouchEvent, useState } from 'react';

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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div
      className="absolute z-30 inset-0 overflow-y-auto bg-[rgba(0,0,0,0.5)]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="login-slider relative flex flex-col p-[4rem] box-border">
          <div className="flex justify-center w-full h-[45%]">
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              className="h-full object-contain"
            />
          </div>
          <p className="text-base text-center mt-2 w-[85%]">
            {slides[currentSlide].text}
          </p>

          {/* Slide indicators */}
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
            <div className="text-center text-sm">
              <p>*T&C apply.</p>
            </div>
          )}

          {slides[currentSlide].footNote && (
            <div className="text-center text-[10px]">
              <p>*All images are for illustration purposes only.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
