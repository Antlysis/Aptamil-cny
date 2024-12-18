import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';

import cnyTop from '../../assets/gif/cny-animation.gif';
import cnyBody from '../../assets/images/cny-body.webp';
import ButtonComponent from '../../components/ButtonComponent';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import { resendOtp, verifyToken } from '../../services/authService';
import { useAppDispatch } from '../../store/hooks';
import { userLogin } from '../../store/userSlice';

const Verify: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Redirect to Login if not logged in when navigate/location change
  useEffect(() => {
    if (!location?.state) {
      navigate('/contest/login');
    }
  }, [navigate, location]);

  // Set timer in localstorage
  useEffect(() => {
    const localStorageTimer = Number(localStorage.getItem('timer'));
    if (localStorageTimer && localStorageTimer > 0) {
      // if timer exists, enable resend and set timer to value
      setResend(true);
      setTimer(Number(localStorageTimer));
    } else {
      // if timer does not exist, disable resend and reset timer
      setResend(false);
      setTimer(60);
    }
  }, []);

  // Timer management
  useEffect(() => {
    let interval: number;
    if (resend) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setResend(false);
            localStorage.setItem('timer', '0');
            return 0;
          }
          localStorage.setItem('timer', String(prevTimer - 1));
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resend]);

  const handleResendOTP = async () => {
    if (timer > 0 && resend) {
      return;
    }
    try {
      const sendData = {
        recipient: '60' + location?.state?.phone,
        tokenAction: location?.state?.identity,
        tokenType: 'PHONE',
      };
      const res = await resendOtp(sendData);

      if (res && res.data) {
        setResend(true);
        setTimer(60);
      } else {
        setLoading(false);
      }
    } catch (error) {
      alert('Failed to resend OTP');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const sendData = {
        token: otp,
        recipient: '60' + location?.state?.phone,
        tokenAction: location?.state?.identity,
        tokenType: 'PHONE',
        degenerate: true,
      };
      const res = await verifyToken(sendData);
      if (res) {
        if (location?.state?.identity === 'LOGIN') {
          Cookies.set('user-token', res?.data?.token);
          console.log(res);

          dispatch(userLogin());
          navigate('/contest/home');
        } else {
          navigate('/contest/register', {
            state: {
              otp,
              phone: location?.state?.phone,
              identity: location.state?.identity,
              ...location?.state,
            },
          });
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      alert('Failed to submit');
      setLoading(false);
    }
  };

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <HotLineButton></HotLineButton>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full flex relative bottom-7" />
      </div>

      <div className="relative -mt-[125px] overflow-hidden z-[3]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative w-[90%] mx-auto">
          <p className="heading-1 py-2.5 px-[50px]">OTP Verication</p>
          <p className="border-b-[3px] border-[#FFDB20] w-[192px] mx-auto"></p>
          <p className="heading-2 p-4 text-center">
            Please enter the verification code sent to
            <br />
            <strong>0{location?.state?.phone}</strong>
          </p>
          <div className="pb-3">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={
                <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp; </span>
              }
              renderInput={props => <input {...props} />}
              containerStyle="w-[284px] mx-auto flex justify-center items-center"
              inputStyle="bg-transparent border-b-[3px] border-b-[#FFFFFF] !w-[62px] h-[58px] gotham-bold text-white text-[32px]"
            />
          </div>
          {resend ? (
            <p className="text-[16px] text-white">
              00:{timer.toString().padStart(2, '0')}
            </p>
          ) : null}
          <p className="text-[16px] text-white" onClick={() => handleResendOTP()}>
            Resend OTP
          </p>
        </div>
        <div className="footer-div">
          <div className="absolute z-40 w-full mx-auto text-center top-[140px]">
            <ButtonComponent
              buttonText="VERIFY"
              buttonType="submit"
              loading={loading}
              buttonFunction={() => handleSubmit()}
              disabled={otp.length < 4}
              buttonClass="button-component"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
