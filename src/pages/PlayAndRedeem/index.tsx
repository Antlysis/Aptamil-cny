import { useEffect, useRef, useState } from 'react';

import slideGif from '../../assets/gif/gatcha-slide.gif';
import gatchaGif from '../../assets/gif/gatcha.gif';
import capsule0 from '../../assets/images/capsule-0.png';
import capsule from '../../assets/images/capsule.png';
import checkmark from '../../assets/images/checkmark.png';
import gameBackground from '../../assets/images/game-background.webp';
import gatchaGame from '../../assets/images/gatcha-game.png';
import DraggableSlider from '../../components/DraggableSlider';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import Modal from '../../components/Modal';
import RewardModal from '../../components/RewardModal';
import { checkValidity, gameReward } from '../../services/index';
import { useAppSelector } from '../../store/hooks';
import { getUserDetails } from '../../store/userSlice';

const PlayAndRedeem = ({ onComplete }: { onComplete?: () => void }) => {
  const [isValid, setIsValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNoTokenModalOpen, setIsNoTokenModalOpen] = useState(false);
  const [reward, setReward] = useState<string>('');
  const [currentTokenBalance, setCurrentTokenBalance] = useState(0);
  const [showSlideGif, setShowSlideGif] = useState(true);
  const [showGatchaGif, setShowGatchaGif] = useState(false);
  const [gifStatus, setGifStatus] = useState<'playing' | 'stopped'>('stopped');
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

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
    if (!isOpen && !isNoTokenModalOpen) {
      setShowSlideGif(false);
    }
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

  const handleSliderComplete = () => {
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
    setTimeout(() => setShowSlideGif(true), 0);
  };

  const handleCloseNoTokenModal = () => {
    setIsNoTokenModalOpen(false);
    setTimeout(() => setShowSlideGif(true), 0);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (currentTokenBalance === 0) {
      event.preventDefault();
      setIsNoTokenModalOpen(true);
      return;
    }

    if (!isOpen && !isNoTokenModalOpen) {
      setShowSlideGif(false);
    }
  };

  const handlePointerUp = () => {
    if (!isOpen && !isNoTokenModalOpen) {
      setShowSlideGif(true);
    }
  };

  const handleSliderAreaInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    if (currentTokenBalance === 0) {
      event.preventDefault();
      event.stopPropagation();
      setIsNoTokenModalOpen(true);
    }
  };

  return (
    <div id="gatchapage" className="overflow-y-auto" onClick={handleScreenClick}>
      {showGatchaGif && (
        <div className="absolute z-[60] flex size-full items-center justify-center">
          <img
            src={gameBackground}
            alt="Game Background"
            className="absolute z-[55] size-full object-cover"
          />

          {gifStatus === 'playing' && (
            <img
              src={gatchaGif}
              className="duration-3000 absolute z-[65] size-full object-contain transition-opacity ease-in-out"
              style={{
                animationIterationCount: 1,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      )}
      <div className="absolute flex w-full justify-between">
        <Header previous={true} />
      </div>
      <div className="relative z-[2] flex justify-center pt-[50px]">
        <img src={gatchaGame} alt={gatchaGame} className="h-auto w-4/5 object-contain" />
        <div
          className="absolute bottom-[10%] h-[100px] w-full"
          ref={sliderRef}
          onMouseDown={handleSliderAreaInteraction}
          onTouchStart={handleSliderAreaInteraction}
        >
          <div className="relative mx-auto flex h-[130px] w-[90%] items-center justify-center">
            {showSlideGif && (
              <img
                src={slideGif}
                className="pointer-events-none absolute top-0 z-[5] h-[90%] w-[96%]"
              />
            )}
            <div className="absolute top-[30%] z-[4] w-3/5">
              <DraggableSlider
                handleTrigger={handleSliderComplete}
                canPlay={isValid && currentTokenBalance > 0 && !isClickDisabled}
                handleDown={handlePointerDown}
                handleUp2={handlePointerUp}
              />
            </div>
          </div>
        </div>
      </div>

      <HotLineButton top="top-3/4" />
      <div className="relative z-[3] overflow-hidden">
        <div className="footer-gatcha">
          <div className="column align-center absolute z-[4] mt-[110px] flex gap-2 text-2xl font-bold">
            <p className="text-white">CAPSULE:</p>
            <div className="relative flex items-center">
              {currentTokenBalance === 0 ? (
                <img src={capsule0} className="size-[30px]" />
              ) : (
                <img src={capsule} className="size-[30px]" />
              )}
              <p className="absolute inset-0 z-[5] flex items-center justify-center text-[#161E4F]">
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
