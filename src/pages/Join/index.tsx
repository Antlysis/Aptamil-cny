import { useState } from 'react';

import cnyBody from '../../assets/images/cny-body.webp';
import cnyTop from '../../assets/images/cny-top.png';
import grandPrizes from '../../assets/images/grand-prizes.png';
import guaranteedRewards from '../../assets/images/guaranteed-rewards.png';
import howToJoin from '../../assets/images/how-to-join.png';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Join: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full" />
      </div>

      <div className="relative -mt-[115px] overflow-hidden z-[3] pb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative w-[80%] mx-auto">
          <p className="heading-3">HOW TO JOIN</p>
          <img src={howToJoin}></img>
          <p className="heading-3">PRIZES</p>
          <img src={guaranteedRewards}></img>
          <img src={grandPrizes} className="mt-4"></img>
          <label className="cursor-pointer flex mt-4">
            <input
              type="checkbox"
              checked={isChecked}
              className={`mr-2 scale-[1.2] h-6 cursor-pointer`}
              onChange={() => setIsChecked(!isChecked)}
            />
            <p className="relative z-40 text-white text-center">Don't show this again</p>
          </label>
        </div>
        <div className="footer-div">
          <div className="absolute z-40 w-full mx-auto text-center top-[140px]">
            <ButtonComponent
              buttonText="LET'S START SSS-LIDING!"
              buttonType="button"
              buttonClass="button-component"
              navigateTo='/home'
            />
            <p className="text-white pt-1">*T&C apply.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Join;
