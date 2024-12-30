import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import cnyTop from '../../assets/gif/cny-animation.gif';
import cnyBody from '../../assets/images/cny-body.webp';
import grandPrizes from '../../assets/images/grand-prizes.png';
import guaranteedRewards from '../../assets/images/guaranteed-rewards.png';
import howToJoin from '../../assets/images/how-to-join.png';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';

const Join: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!location.state?.fromHome) {
      const shouldSkip = localStorage.getItem('skipJoinPage') === 'true';
      if (shouldSkip) {
        navigate('/home');
      }
    }
  }, [navigate]);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (newValue) {
      localStorage.setItem('skipJoinPage', 'true');
    } else {
      localStorage.removeItem('skipJoinPage');
    }
  };

  return (
    <div id="page" className="overflow-y-auto">
      <div className="fixed flex justify-between w-full z-50">
        <Header />
      </div>
      <HotLineButton noHeader noFooter />
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full flex relative bottom-7" />
      </div>

      <div className="relative -mt-[130px] overflow-hidden z-[3] mb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative w-[80%] mx-auto">
          <p className="heading-3 gotham-bold">HOW TO JOIN</p>
          <img src={howToJoin}></img>
          <p className="heading-3 gotham-bold">PRIZES</p>
          <img src={guaranteedRewards}></img>
          <img src={grandPrizes} className="mt-4"></img>
          {!location.state?.fromHome && (
            <label className="cursor-pointer flex mt-4">
              <input
                type="checkbox"
                checked={isChecked}
                className="mr-2 scale-[1.2] h-6 cursor-pointer"
                onChange={handleCheckboxChange}
              />
              <p className="relative z-40 text-white text-center">
                Don't show this again
              </p>
            </label>
          )}
        </div>
        <div className="footer-div">
          <div className="absolute z-40 w-full mx-auto text-center top-[140px]">
            <ButtonComponent
              buttonText="LET'S START SSS-LIDING!"
              buttonType="button"
              buttonClass="button-component"
              navigateTo="/home"
            />
            {!location.state?.fromHome && <p className="text-white pt-1">*T&C apply.</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Join;
