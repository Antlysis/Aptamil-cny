import React, { FormEvent, ReactNode, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { checkUser, register } from '../../services/authService';
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
  type?: string;
  modal?: {
    logo: string;
    title: string;
    body: string | React.ReactNode;
    modalButtonText: string;
    modalButtonClass: string;
    modalFunction?: () => void;
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
  type,
  modal,
}: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState<FormValues>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const projectID = import.meta.env.VITE_APP_PROJECT_ID;

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

    setIsFormValid(isValid && (type === 'register' ? areCheckboxesValid : true));
  }, [errors, values, formConfig?.fields, checkboxStates]);

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
    try {
      if (type === 'checkUser') {
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const sendData = {
          phone: '60' + data.phone,
          type: 'PHONE',
          campaignId: import.meta.env.VITE_APP_CAMPAIGN_ID,
        };
        if (buttonFunction) {
          await buttonFunction();
        }
        const res = await checkUser(sendData);
        if (res) {
          const dataToPass = {
            phone: data.phone,
            identity: res?.data?.identity,
            channel: additionalFields?.channel,
          };
          if (modal) {
            setShowModal(true);
          }
          setLoading(false);
          navigate('/verify', { state: dataToPass });
        } else {
          setLoading(false);
        }
      } else if (type === 'register') {
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const registerData = {
          name: data.name as string,
          phone: '60' + additionalFields?.state?.phone,
          email: data.email as string,
          type: 'PHONE',
          registerSource: {
            channel: additionalFields?.state?.channel,
            project: 'Aptamil CNY 2025',
          },
          projectId: projectID,
        };
        const res = await register(registerData);
        if (res) {
          Cookies.set('user-token', res?.data?.token);
          setShowModal(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      alert('Failed to Submit Data');
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
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
