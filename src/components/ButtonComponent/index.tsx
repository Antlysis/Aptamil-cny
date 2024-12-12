import { useState } from 'react';

import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal';
import Spinner from '../Spinner';

type ButtonType = 'submit' | 'button' | 'reset';
interface ButtonComponentProps {
  loading?: boolean;
  buttonText: string;
  buttonType?: ButtonType;
  disabled?: boolean;
  buttonClass?: string;
  buttonFunction?: () => void;
  navigateTo?: string | { pathname: string; state?: any };
  modal?: {
    logo: string;
    title: string;
    body: string | React.ReactNode;
    modalButtonText: string;
    modalButtonClass: string;
    show?: boolean;
    onClose?: () => void;
    modalFunction?: () => void;
  };
}

function ButtonComponent({
  loading,
  buttonText,
  buttonType = 'button',
  disabled,
  buttonClass,
  buttonFunction,
  navigateTo,
  modal,
}: ButtonComponentProps) {
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonFunction) {
      buttonFunction();
    }
    if (modal) {
      setLocalModalVisible(true);
    }
    if (buttonType !== 'submit' && navigateTo) {
      if (typeof navigateTo === 'string') {
        navigate(navigateTo);
      } else {
        navigate(navigateTo.pathname, { state: navigateTo.state });
      }
    }
  };

  const handleModalClose = () => {
    // Execute modal function if provided
    if (modal?.modalFunction) {
      modal.modalFunction();
    }

    // Handle onClose callback if provided
    if (modal?.onClose) {
      modal.onClose();
    } else {
      // Otherwise use local state
      setLocalModalVisible(false);
    }
  };

  const isModalVisible = modal?.show !== undefined ? modal.show : localModalVisible;

  return (
    <>
      <Button
        type={buttonType}
        className={`${buttonClass || ''} ${loading || disabled ? 'disabled-button' : ''}`}
        disabled={loading || disabled}
        onClick={handleButtonClick}
      >
        {buttonText}
        {loading && <Spinner color="white" />}
      </Button>

      {isModalVisible && modal && (
        <Modal
          logo={modal.logo}
          title={modal.title}
          body={modal.body}
          buttonText={modal.modalButtonText}
          buttonClass={modal.modalButtonClass}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default ButtonComponent;
