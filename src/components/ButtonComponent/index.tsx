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
  navigateTo?: string;
  modal?: {
    logo: string;
    title: string;
    body: string | React.ReactNode;
    modalButtonText: string;
    modalButtonClass: string;
    navigateTo?: string;
    show?: boolean;
    onClose?: () => void;
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

    // Handle modal visibility regardless of button type
    if (modal) {
      setLocalModalVisible(true);
    }
    
    // Only navigate immediately if it's not a submit button and we have a navigation path
    if (buttonType !== 'submit' && navigateTo) {
      navigate(navigateTo);
    }
  };
  
  const handleModalClose = () => {
    if (modal?.onClose) {
      // If parent provided onClose, use that
      modal.onClose();
    } else {
      // Otherwise use local state
      setLocalModalVisible(false);
      // Handle navigation after modal closes
      if (modal?.navigateTo) {
        navigate(modal.navigateTo);
      }
    }
  };

  // Determine if modal should be shown based on either local state or parent control
  const isModalVisible = modal?.show !== undefined ? modal.show : localModalVisible;

  return (
    <>
      <Button
        type={buttonType}
        className={`${buttonClass || ''}`}
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
          navigateTo={modal.navigateTo}
        />
      )}
    </>
  );
}

export default ButtonComponent;