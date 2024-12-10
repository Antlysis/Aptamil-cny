import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import cnyBody from '../../assets/images/cny-body.webp';
import cnyTop from '../../assets/images/cny-top.png';
import successLogo from '../../assets/images/svg/successLogo.svg';
import AuthForm from '../../components/AuthForm';
import Checkbox from '../../components/Checkbox';
import Header from '../../components/Header';

const Register: React.FC = () => {
  const location = useLocation();
  const [termsChecked, setTermsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  const handleTermsChange = (checked: boolean) => {
    setTermsChecked(checked);
  };

  const handleMarketingChange = (checked: boolean) => {
    setMarketingChecked(checked);
  };

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full" />
      </div>

      <div className="relative -mt-[115px] overflow-hidden z-[3]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative">
          <p className="heading-1 py-2.5 px-[50px]">Sign Up</p>
          <p className="border-b-[3px] border-[#FFDB20] w-[192px] mx-auto"></p>
          <AuthForm
            formConfig={{
              fields: [
                {
                  name: 'name',
                  type: 'name',
                  placeholder: 'Full Name*',
                  inputGroupClass: 'input-signup',
                  inputDivClass: 'input-div',
                  inputClass: 'input-field',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'email',
                  placeholder: 'Email*',
                  inputGroupClass: 'input-signup',
                  inputDivClass: 'input-div',
                  inputClass: 'input-field',
                  required: true,
                },
              ],
              authFormClass: 'auth-form',
            }}
            additionalFields={{
              path: location.pathname,
              params: location.search,
            }}
            buttonText="REGISTER"
            checkboxStates={{
              terms: termsChecked,
              marketing: marketingChecked,
            }}
            modal={{
              logo: successLogo,
              title: 'Successful!',
              body: (
                <>
                  Welcome! You're now part of our <br />
                  Aptamil<sup>TM</sup> KID Mini Program
                  <br />
                  <br />
                  Stay tuned for more exciting rewards!
                </>
              ),
              modalButtonText: 'OK',
              modalButtonClass: 'bg-[#02BC7D] hover:bg-green-700',
              navigateTo:'/join',
            }}
          >
            <div className="mb-4 w-full">
              <Checkbox
                label={
                  <div>
                    <span>By submitting this form, I hereby agree to the </span>
                    <a href="/terms" className="underline font-bold">
                      Terms and Conditions
                    </a>
                    <span>
                      {' '}
                      and consent to the collection and processing of my personal data by
                      Danone Specialized Nutrition (Malaysia) Sdn. Bhd. in accordance with
                      the ​
                    </span>
                    <a href="/privacy" className="underline font-bold">
                      Privacy Policy
                    </a>
                  </div>
                }
                checked={termsChecked}
                onChange={handleTermsChange}
              />
              <Checkbox
                label={
                  <div>
                    <span>
                      I hereby consent to receive Aptamil<sup>TM</sup> KID information via
                      mail/SMS/phone/WhatsApp/Email. Collected data can also be used for
                      customer service purpose.
                    </span>
                  </div>
                }
                checked={marketingChecked}
                onChange={handleMarketingChange}
              />
            </div>
          </AuthForm>
          <div className="footer-div"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
