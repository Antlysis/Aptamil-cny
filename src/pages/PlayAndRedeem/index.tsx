import { useEffect, useState } from 'react';

import slideGif from '../../assets/gif/gatcha-slide.gif';
import gatchaGif from '../../assets/gif/gatcha.gif';
import capsule0 from '../../assets/images/capsule-0.png';
import capsule from '../../assets/images/capsule.png';
import checkmark from '../../assets/images/checkmark.png';
import gameBackground from '../../assets/images/game-background.webp';
import gatchaGame from '../../assets/images/gatcha-game.png';
import slide from '../../assets/images/gatcha-slide.png';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import Modal from '../../components/Modal';
import RewardModal from '../../components/RewardModal';
import { checkValidity, gameReward } from '../../services/index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserDetails } from '../../store/userSlice';

const PlayAndRedeem = ({ onComplete }: { onComplete?: () => void }) => {
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNoTokenModalOpen, setIsNoTokenModalOpen] = useState(false);
  const [reward, setReward] = useState<string>('');
  const [currentTokenBalance, setCurrentTokenBalance] = useState(0);
  const [showSlideGif, setShowSlideGif] = useState(true);
  const [showGatchaGif, setShowGatchaGif] = useState(false);
  const [gifStatus, setGifStatus] = useState<'playing' | 'stopped'>('stopped');
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  const campaignId = import.meta.env.VITE_APP_GAMES_CAMPAIGN_ID;
  const userDetails = useAppSelector(getUserDetails);
  const tokenBalance = userDetails?.data?.personalInfo?.totalTokenBalance || 0;

  useEffect(() => {
    setCurrentTokenBalance(tokenBalance);
  }, [tokenBalance]);

  useEffect(() => {
    const fetchValidity = async () => {
      try {
        const result = await checkValidity();
        if (result) {
          setIsValid(result?.isValid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchValidity();
  }, []);

  const handleScreenClick = () => {
    setShowSlideGif(false);
  };

  const handleGatchaGif = async () => {
    if (isClickDisabled) return;
    setIsClickDisabled(true);

    setGifStatus('playing');
    setShowGatchaGif(true);

    try {
      const response = await gameReward({
        campaignId: campaignId,
      });

      setTimeout(() => {
        setGifStatus('stopped');

        if (response) {
          const reward = response?.data?.data?.rewards[0].rewardValue;
          console.log('Reward Value:', reward);
          setReward(reward);
          setShowGatchaGif(false);
          setIsOpen(true);
          setCurrentTokenBalance(prev => prev - 1);
          onComplete?.();
        } else {
          console.error('No rewards found in the response');
        }

        setIsClickDisabled(false);
      }, 6500);
    } catch (error) {
      console.error('Game reward error:', error);
      setIsClickDisabled(false);
    }
  };

  const handleClick = () => {
    if (currentTokenBalance === 0) {
      setIsNoTokenModalOpen(true);
      return;
    }

    if (isValid && !isClickDisabled) {
      handleGatchaGif();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsClickDisabled(false);
  };

  const handleCloseNoTokenModal = () => {
    setIsNoTokenModalOpen(false);
  };

  return (
    <div id="gatchapage" className="overflow-y-auto" onClick={handleScreenClick}>
      {showGatchaGif && (
        <div className="absolute z-[60] w-full h-full flex items-center justify-center">
          <img
            src={gameBackground}
            alt="Game Background"
            className="absolute z-[55] w-full h-full object-cover"
          />

          {gifStatus === 'playing' && (
            <img
              src={gatchaGif}
              className="absolute z-[65] w-full h-full object-contain transition-opacity duration-3000 ease-in-out"
              style={{
                animationIterationCount: 1,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      )}
      <div className="absolute flex justify-between w-full">
        <Header previous={true} />
      </div>
      <div className="relative z-[2] flex justify-center pt-[50px]">
        <img
          src={gatchaGame}
          alt={gatchaGame}
          className="w-[80%] h-auto object-contain"
        ></img>
        <img
          src={slide}
          className="absolute z-[3] w-[60%] mt-[125vw]"
          onClick={handleClick}
        ></img>
        {showSlideGif && (
          <img src={slideGif} className="absolute z-[3] w-full mt-[115vw]"></img>
        )}
      </div>

      <HotLineButton top="top-3/4" />
      <div className="relative overflow-hidden z-[3]">
        <div className="footer-gatcha">
          <div className="z-[4] mt-[110px] absolute flex column align-center gap-2 font-bold text-2xl">
            <p className="text-white">CAPSULE:</p>
            <div className="relative flex items-center">
              {currentTokenBalance === 0 ? (
                <img src={capsule0} className="w-[30px] h-[30px]" />
              ) : (
                <img src={capsule} className="w-[30px] h-[30px]" />
              )}
              <p className="z-[5] text-[#161E4F] inset-0 absolute flex items-center justify-center">
                {currentTokenBalance}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <RewardModal reward={reward} isOpen={isOpen} onClose={handleCloseModal} />

      {isNoTokenModalOpen && (
        <Modal
          logo={checkmark}
          title="Sorry.."
          body="You don't have any valid entry yet. Submit your receipt now to get your guaranteed rewards!"
          buttonText="UPLOAD RECEIPT NOW"
          buttonClass="bg-[#001489] hover:bg-blue-700"
          onClose={handleCloseNoTokenModal}
          navigateTo="/upload"
        />
      )}
    </div>
  );
};

export default PlayAndRedeem;
