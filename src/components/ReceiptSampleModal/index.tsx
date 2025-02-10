import React, { useState } from 'react';

import close from '../../assets/images/close-icon.png';
import sample1 from '../../assets/images/sample1.png';
import sample2 from '../../assets/images/sample2.png';
import sample3 from '../../assets/images/sample3.png';

interface ReceiptSampleProps {
  open: boolean;
  onClose: () => void;
}

const ReceiptSample: React.FC<ReceiptSampleProps> = ({ open, onClose }) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      subtitle: '(Physical Receipt)',
      text: 'Make sure these details are clear in the photo:',
      image: sample1,
    },
    {
      subtitle: '(Shopee Invoice)',
      header: 'How to download the invoice in Shopee',
      list: [
        "In your Shopee App, go to 'Me' tab and select View Purchase History",
        'Select your order',
        "Under 'Order ID' tab, E-Invoice, Click 'Request Now'",
        "Enter information require and Click 'Submit Request'",
        "You will receive an email as below and there's an attachment containing your invoice",
      ],
      image: sample2,
    },
    {
      subtitle: '(Lazada Invoice)',
      header: 'How to download the invoice in Lazada',
      list: [
        'In your Lazada App, go to Account and select View All Orders',
        'Select your order',
        'Click More and Select Receipt',
        'Enter your email address and click Confirm and you will received the invoice within 24 hours to your email',
        "You will receive an email as below and there's an attachment containing your invoice",
      ],
      image: sample3,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const previousSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > 75) {
      if (swipeDistance > 0 && currentSlide < slides.length - 1) {
        nextSlide();
      }
      if (swipeDistance < 0 && currentSlide > 0) {
        previousSlide();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setMouseEnd(null);
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setMouseEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && mouseStart && mouseEnd) {
      const dragDistance = mouseStart - mouseEnd;

      if (Math.abs(dragDistance) > 75) {
        if (dragDistance > 0 && currentSlide < slides.length - 1) {
          nextSlide();
        }
        if (dragDistance < 0 && currentSlide > 0) {
          previousSlide();
        }
      }
    }

    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[90%] max-w-[560px] bg-white rounded-lg p-8 shadow-lg relative">
          <div className="absolute top-4 right-4">
            <img
              src={close}
              alt="Close"
              className="w-6 h-6 cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold m-0">Receipt Sample</h1>
              <h2 className="text-xl font-normal m-0">{slides[currentSlide].subtitle}</h2>
              {slides[currentSlide].text && (
                <p className="mt-4 font-medium">{slides[currentSlide].text}</p>
              )}
              {slides[currentSlide].header && (
                <p className="mt-4 font-medium">{slides[currentSlide].header}</p>
              )}
              {slides[currentSlide].list && (
                <ol className="text-left list-decimal pl-6 mt-4">
                  {slides[currentSlide].list.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ol>
              )}
              <img
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                className="max-h-[400px] w-full object-contain my-4"
              />
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3.5 w-3.5 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptSample;
