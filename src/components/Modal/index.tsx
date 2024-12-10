import React from 'react';

import { useNavigate } from 'react-router-dom';

interface ModalProps {
  logo: string;
  title: string;
  body: string | React.ReactNode;
  buttonText: string;
  buttonClass: string;
  onClose: () => void;
  navigateTo?: string;
}

function Modal({
  logo,
  title,
  body,
  buttonText,
  buttonClass,
  onClose,
  navigateTo,
}: ModalProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClose();
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-[rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[90%] mx-auto bg-white rounded-[10px] p-8">
          <div className="flex justify-center">
            <img src={logo} alt="Success" className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-center mt-4">{title}</h2>
          <p className="text-center mt-2">{body}</p>
          <div className="flex justify-center mt-6">
            <button
              className={`${buttonClass} text-white font-bold py-2 px-4 rounded-[36px] w-full`}
              onClick={handleClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
