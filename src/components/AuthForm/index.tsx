import React, { FormEvent, ReactNode, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { checkUser } from '../../services/authService';
import { useAppDispatch } from '../../store/hooks';
import ButtonComponent from '../ButtonComponent';
import InputField from '../InputField';

interface AuthFormProps {
  formConfig?: {
    fields: {
      name: string;
      label?: string;
      type: string;
      placeholder?: string;
      value?: string;
      disabled?: boolean;
      required?: boolean;
      inputGroupClass?: string;
      inputDivClass?: string;
      inputClass?: string;
      phonePrefix?: boolean;
    }[];
    authFormClass?: string;
  };
  additionalFields?: Record<string, any>;
  children?: ReactNode;
  buttonText?: string;
  buttonClass?: string;
  checkboxStates?: {
    [key: string]: boolean;
  };
  buttonFunction?: () => void;
  // navigateTo?: string;
  type?: string;
  modal?: {
    logo: string;
    title: string;
    body: string | React.ReactNode;
    modalButtonText: string;
    modalButtonClass: string;
    navigateTo?: string;
  };
}

interface FormErrors {
  [key: string]: string | null;
}

interface FormValues {
  [key: string]: string;
}

function AuthForm({
  formConfig,
  additionalFields,
  children,
  buttonText,
  buttonClass,
  checkboxStates,
  buttonFunction,
  // navigateTo,
  type,
  modal,
}: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState<FormValues>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formConfig?.fields) {
      const initialErrors: FormErrors = {};
      const initialValues: FormValues = {};
      formConfig.fields.forEach(field => {
        initialErrors[field.name] = null;
        initialValues[field.name] = field.value || '';
      });
      setErrors(initialErrors);
      setValues(initialValues);
    }
  }, []);

  useEffect(() => {
    if (!formConfig?.fields) return;

    const hasErrors = Object.values(errors).some(error => error !== null);
    if (hasErrors) {
      setIsFormValid(false);
      return;
    }

    const isValid = formConfig.fields.every(field => {
      if (field.required) {
        const fieldValue = values[field.name];
        return fieldValue && fieldValue.trim().length > 0;
      }
      return true;
    });

    const areCheckboxesValid = checkboxStates
      ? checkboxStates.terms === true && checkboxStates.marketing === true
      : false;

    //   setIsFormValid(isValid && areCheckboxesValid);
    // }, [errors, values, formConfig?.fields, checkboxStates]);

    setIsFormValid(isValid);
  }, [errors, values, formConfig?.fields]);

  const handleFieldChange = (name: string, value: string, error: string | null) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log('Form Values:');

    try {
      if (type === 'checkUser') {
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const sendData = {
          phone: '60' + data.phone,
          type: 'PHONE',
        };

        // if (buttonFunction) {
        //   await buttonFunction();
        // }

        const res = await checkUser(sendData);
        console.log('CheckUser Response:', res); // Log the entire response
        console.log('Response Data:', res?.data);
        console.log('Identity:', res?.data?.data?.identity);

        if (res) {
          const dataToPass = {
            phone: data.phone,
            identity: res?.data?.data?.identity,
          };

          if (modal) {
            setShowModal(true);
          }

          setLoading(false);
          navigate('/verify', { state: dataToPass });
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      alert('Error: Failed to submit');
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Navigate after modal closes if navigateTo is specified in modal
    if (modal?.navigateTo) {
      navigate(modal.navigateTo);
    }
  };

  if (!formConfig?.fields) {
    return null;
  }

  return (
    <form id="authForm" onSubmit={handleSubmit} className={formConfig.authFormClass}>
      {formConfig.fields.map(field => (
        <InputField
          key={field.name}
          id={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={values[field.name]}
          disabled={field.disabled}
          placeholder={field.placeholder}
          onFieldChange={handleFieldChange}
          required={field.required}
          inputGroupClass={field.inputGroupClass}
          inputDivClass={field.inputDivClass}
          inputClass={field.inputClass}
          phonePrefix={field.phonePrefix}
        />
      ))}

      {children}

      <div className="authform-bottom">
        <ButtonComponent
          buttonText={buttonText || 'Submit'}
          buttonType="submit"
          loading={loading}
          disabled={!isFormValid}
          buttonClass={buttonClass || 'button-component'}
          buttonFunction={buttonFunction}
          modal={
            modal
              ? {
                  ...modal,
                  show: showModal,
                  onClose: handleModalClose,
                }
              : undefined
          }
        />
      </div>
    </form>
  );
}

export default AuthForm;
