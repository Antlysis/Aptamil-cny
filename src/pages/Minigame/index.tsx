import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import gameBackground from '../../assets/images/game-background.webp';
import howTo from '../../assets/images/how-to-match.png';
import MatchWin from '../../assets/images/match-win.png';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import MatchModal from '../../components/MatchModal';

const MinigameResult: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [timeTaken, setTimeTaken] = useState('');
  const location = useLocation();
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const secondsParam = params.get('time');
    const totalSeconds = parseInt(secondsParam || '0', 10);

    if (!isNaN(totalSeconds)) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const minSec = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      setTimeTaken(minSec);
    }
  }, [location.search]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="page" className="overflow-y-auto">
      {isModalOpen && <MatchModal time={timeTaken} onClose={handleCloseModal} />}
      <div className="absolute flex justify-between w-full">
        <Header previous={true} />
      </div>
      <div className="relative overflow-hidden z-[3]">
        <img
          src={gameBackground}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0 max-w-[600px]"
        />
        <div className="pt-[100px] w-[90%] mx-auto flex flex-col relative z-[2] ">
          <img src={MatchWin} alt="Match Win" onClick={handleOpenModal} />
          <img src={howTo} alt="How To" className="pt-5" />
        </div>
        <div className="footer-div">
          <div className="relative z-40 w-full mx-auto text-center my-3">
            <ButtonComponent
              buttonText="UPLOAD RECEIPT"
              buttonType="button"
              buttonClass="button-component"
              navigateTo="/upload"
            />
          </div>
          <HotLineButton></HotLineButton>
          <div className="grid flex-grid grid-cols-2 gap-2 w-[90%] mx-auto">
            <div className="relative">
              <div className="z-40 w-full mx-auto text-center top-[140px]">
                <ButtonComponent
                  buttonText="TRACK MY SUBMISSION"
                  buttonType="button"
                  buttonClass="home-button"
                  navigateTo={`${aptamilCampaign}/profile/history`}
                />
                <a
                  href="https://www.aptamilkid.com.my/footer-navigation/terms-and-conditions.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-white underline mt-2">Terms & Conditions</p>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="z-40 w-full mx-auto text-center top-[140px]">
                <ButtonComponent
                  buttonText="HOW TO JOIN"
                  buttonType="button"
                  buttonClass="home-button"
                  navigateTo={{
                    pathname: '/join',
                    state: { fromHome: true },
                  }}
                />
                <a
                  href="https://www.aptamilkid.com.my/footer-navigation/privacy-policy.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-white underline mt-2">Privacy Policy</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MinigameResult;
