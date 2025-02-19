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
  filePresent?: boolean;
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
  filePresent = false,
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
        if (navigateTo.startsWith('http://') || navigateTo.startsWith('https://')) {
          window.location.href = navigateTo;
        } else {
          navigate(navigateTo);
        }
      } else {
        navigate(navigateTo.pathname, { state: navigateTo.state });
      }
    }
  };

  const handleModalClose = () => {
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
  const isButtonDisabled =
    loading || disabled || (buttonText === 'SUBMIT RECEIPT' && !filePresent);
  const isRewardDisabled = disabled;

  return (
    <>
      <Button
        type={buttonType}
        className={`${buttonClass || ''} ${isButtonDisabled ? 'disabled-button' : ''} ${isRewardDisabled ? 'rewards-disabled' : ''} flex items-center justify-center gap-2 m-auto`}
        disabled={isButtonDisabled || isRewardDisabled}
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
