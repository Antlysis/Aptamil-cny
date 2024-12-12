import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import cnyTop from '../../assets/gif/cny-animation.gif';
import cnyBody from '../../assets/images/cny-body.webp';
import loginSlider1 from '../../assets/images/login-slider-1.png';
import loginSlider2 from '../../assets/images/login-slider-2.png';
import loginSlider3 from '../../assets/images/login-slider-3.png';
import AuthForm from '../../components/AuthForm';
import Header from '../../components/Header';
import LoginModal from '../../components/LoginModal';

const Login: React.FC = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="page" className="overflow-y-auto">
      {isModalOpen && (
        <LoginModal
          slides={[
            {
              image: loginSlider1,
              text: (
                <>
                  Welcome! Let's Sss-lide your way into
                  <strong> Strength and Smartness </strong>
                  this Chinese New Year with{' '}
                  <strong>
                    Aptamil<sup>TM</sup> KID!
                  </strong>
                </>
              ),
              termsText: true,
            },
            {
              image: loginSlider2,
              text: (
                <>
                  Get <strong>Guaranteed Rewards*</strong> up to <strong>RM88.88</strong>{' '}
                  by purchasing a minimum of <strong>RM88 worth</strong> of participating
                  Aptamil<sup>TM</sup> KID products
                </>
              ),
              termsText: true,
            },
            {
              image: loginSlider3,
              text: (
                <>
                  Complete a simple mini-game and stand a chance to win
                  <strong> GRAND PRIZES!</strong>
                </>
              ),
              footNote: true,
            },
          ]}
          onClose={handleCloseModal}
        />
      )}
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full flex relative bottom-7" />
      </div>

      <div className="relative -mt-[125px] overflow-hidden z-[3]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative">
          <p className="heading-1 py-2.5 px-[50px]">Log In</p>
          <p className="border-b-[3px] border-[#FFDB20] w-[192px] mx-auto"></p>
          <p className="heading-2 p-4 text-center leading-none">
            Key in your registered mobile number to login
          </p>
          <AuthForm
            formConfig={{
              fields: [
                {
                  name: 'phone',
                  type: 'tel',
                  placeholder: 'Phone Number',
                  inputGroupClass: 'input-group',
                  inputDivClass: 'input-div',
                  inputClass: 'input-field text-center',
                  phonePrefix: true,
                  required: true,
                },
              ],
              authFormClass: 'auth-form',
            }}
            additionalFields={{
              path: location.pathname,
              params: location.search,
            }}
            buttonText="Login"
            type="checkUser"
          />
        </div>
        <div className="footer-div"></div>
      </div>
    </div>
  );
};

export default Login;
