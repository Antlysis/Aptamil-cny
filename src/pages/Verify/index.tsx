import { useState } from 'react';

import OtpInput from 'react-otp-input';

import cnyBody from '../../assets/images/cny-body.webp';
import cnyTop from '../../assets/images/cny-top.png';
import ButtonComponent from '../../components/ButtonComponent';
import Header from '../../components/Header';

const Verify: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    try {
      console.log(otp);
    } catch (error) {
      console.log(error);
      alert('Failed to');
    }
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

        <div className="pt-[110px] flex flex-col items-center justify-between relative w-[90%] mx-auto">
          <p className="heading-1 py-2.5 px-[50px]">OTP Verication</p>
          <p className="border-b-[3px] border-[#FFDB20] w-[192px] mx-auto"></p>
          <p className="heading-2 p-4 text-center">
            Please enter the verification code sent to
            <br />
            <strong>0123456789</strong>
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
          <p className="text-[16px] text-white">00:45</p>
          <p className="text-[16px] text-white">Resend OTP</p>
        </div>
        <div className="footer-div">
          <div className="absolute z-40 w-full mx-auto text-center top-[140px]">
            <ButtonComponent
              buttonText="VERIFY"
              buttonType="submit"
              loading={loading}
              buttonFunction={() => handleSubmit()}
              buttonClass="button-component"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
