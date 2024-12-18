import React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@headlessui/react';

import capsule from '../../assets/images/capsule.png';
import gatchaGame from '../../assets/images/gatcha-game.png';
import gatchapongSlider from '../../assets/images/gatcha-slide.png';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import RewardModal from '../../components/RewardModal';
import { checkValidity, gameReward } from '../../services/index';
import { useAppSelector } from '../../store/hooks';
import { getUserDetails } from '../../store/userSlice';

const PlayAndRedeem = () => {
  const [isValid, setIsValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState<string>('');

  const campaignId = import.meta.env.VITE_APP_GAMES_CAMPAIGN_ID;

  const userDetails = useAppSelector(getUserDetails);
  const tokenBalance = userDetails?.data?.personalInfo?.totalTokenBalance || 0;

  useEffect(() => {
    const fetchValidity = async () => {
      try {
        const result = await checkValidity();
        if (result) {
          setIsValid(result?.isValid);
          // setRewardOptionId(result?.rewards.map((item: { id: string }) => item.id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchValidity();
  }, []);

  const handleClick = async () => {
    if (isValid) {
      try {
        const response = await gameReward({
          campaignId: campaignId,
        });
        if (response) {
          const reward = response?.data?.data?.rewards[0].rewardValue;
          console.log('Reward Value:', reward);
          setReward(reward);
          setIsOpen(true);
        } else {
          console.error('No rewards found in the response');
        }
      } catch (error) {
        console.error('Game reward error:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div id="gatchapage" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header previous={true} />
      </div>
      <div className="relative z-[2] flex justify-center pt-[50px]">
        <img
          src={gatchaGame}
          alt={gatchaGame}
          className="w-[80%] h-auto object-contain"
        ></img>
        {/* <img src={gatchapongSlide} className="absolute z-[3] w-full mt-[370px]"></img> */}
        <img src={gatchapongSlider} className="absolute z-[3] w-[60%] mt-[130vw]"></img>
      </div>

      <HotLineButton top="top-3/4" />
      <div className="relative overflow-hidden z-[3]">
        <div className="footer-gatcha">
          <Button
            onClick={handleClick}
            disabled={!isValid}
            className={`${!isValid ? 'disabled-button ' : ''}text-black border-2 border-black bg-white z-[5] h-fit w-[50%] mt-[50px]`}
          >
            CLICK
          </Button>
          <div className="z-[4] mt-[110px] absolute flex column align-center gap-2 font-bold text-2xl">
            <p className="text-white">CAPSULE:</p>
            <div className="relative flex items-center justify-center">
              <img src={capsule} className="w-[30px] h-[30px]"></img>
              <p className="z-[5] text-[#161E4F] inset-0 absolute flex items-center justify-center">
                {tokenBalance}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <RewardModal reward={reward} isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default PlayAndRedeem;
