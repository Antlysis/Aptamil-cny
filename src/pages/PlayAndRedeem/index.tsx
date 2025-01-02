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
// import { getRewardStock } from '../../services';
import { checkValidity, gameReward } from '../../services/index';
import { useAppSelector } from '../../store/hooks';
import { getUserDetails } from '../../store/userSlice';

const PlayAndRedeem = ({ onComplete }: { onComplete?: () => void }) => {
  const [isValid, setIsValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
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

  // const rewardIdsList = [
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_688,
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_1888,
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_3888,
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_8888,
  // ];

  useEffect(() => {
    setCurrentTokenBalance(tokenBalance);
    if (tokenBalance === 0) {
      setIsNoTokenModalOpen(true);
      setShowSlideGif(false);
    } else {
      setIsNoTokenModalOpen(false);
      setShowSlideGif(true);
    }
  }, [tokenBalance]);

  useEffect(() => {
    if (!isOpen && isModalClosing) {
      setIsModalClosing(false);
    }
  }, [isOpen, isModalClosing, currentTokenBalance]);

  useEffect(() => {
    // const checkStock = async () => {
    //   const gotStock = await getRewardStock(rewardIdsList);
    //   if (gotStock) {
    //     const outOfStock = (gotStock.data as { isValid: boolean }[]).every(
    //       (item: { isValid?: boolean }) => !item.isValid
    //     );

    //     if (outOfStock) {
    //       setIsNoTokenModalOpen(true);
    //       setShowSlideGif(false);
    //     }
    //   }
    // };

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

    // checkStock();
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
    setIsModalClosing(true);
    setIsOpen(false);
    setIsClickDisabled(false);
    if (currentTokenBalance === 0) {
      setIsNoTokenModalOpen(true);
    }
  };

  const handleCloseNoTokenModal = () => {
    setIsNoTokenModalOpen(false);
    if (currentTokenBalance > 0) {
      setTimeout(() => setShowSlideGif(true), 0);
    }
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
        <div className="fixed z-[60] flex size-full max-w-[600px] items-center justify-center">
          <div className="relative mx-auto size-full max-w-[600px]">
            <img
              src={gameBackground}
              alt="Game Background"
              className="absolute z-[55] size-full max-w-[600px]"
            />

            {gifStatus === 'playing' && (
              <img
                src={gatchaGif}
                className="duration-3000 absolute z-[65] size-full max-w-[600px] transition-opacity ease-in-out"
                style={{
                  animationIterationCount: 1,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </div>
      )}
      <div className="absolute flex w-full max-w-[600px] justify-between">
        <Header previous={true} />
      </div>
      <HotLineButton noHeader noFooter />
      <div className="relative z-[2] flex justify-center pt-[50px]">
        <img src={gatchaGame} alt={gatchaGame} className="h-[70vh] w-auto object-contain" />
        <div
          className="absolute bottom-[6%] w-full md:bottom-[10%]"
          ref={sliderRef}
          onMouseDown={handleSliderAreaInteraction}
          onTouchStart={handleSliderAreaInteraction}
        >
          <div className="relative mx-auto flex h-[130px] w-[90%] items-center justify-center">
            <div className="absolute bottom-[60%] z-[4] m-auto w-3/5 md:bottom-[40%]">
              <DraggableSlider
                handleTrigger={handleSliderComplete}
                canPlay={isValid && currentTokenBalance > 0 && !isClickDisabled}
                handleDown={handlePointerDown}
                handleUp2={handlePointerUp}
              />
            </div>
            {showSlideGif && (
              <img
                src={slideGif}
                className="pointer-events-none absolute bottom-[6%] z-[5] h-auto w-[96%] md:-bottom-1/4"
              />
            )}
          </div>
        </div>
      </div>

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

      {!isModalClosing && isNoTokenModalOpen && (
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
