import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import gameBackground from '../../assets/images/game-background.webp';
import howTo from '../../assets/images/how-to-match.png';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import { updateProfileOutput } from '../../services/authService';
import { getUserDetailsAPI } from '../../services/authService';
import { useAppSelector } from '../../store/hooks';
import { useAppDispatch } from '../../store/hooks';
import { getUserDetails, setUserDetails } from '../../store/userSlice';

const MiniGame: React.FC = () => {
  const navigate = useNavigate();
  const userDetails = useAppSelector(getUserDetails);
  const dispatch = useAppDispatch();
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;

  useEffect(() => {
    const handleGameMessage = async (event: MessageEvent) => {
      if (event.data.action === 'gameCompleted') {
        try {
          const existingMinigame =
            userDetails?.data?.personalInfo?.extendedFields?.minigame || [];

          const updatedMinigame = [
            ...existingMinigame,
            {
              date: new Date().toLocaleString('en-GB'),
              timer: event.data.data,
            },
          ];

          const updateData = {
            values: {
              extendedFields: {
                minigame: updatedMinigame,
              },
            },
          };
          console.log('Update Payload:', JSON.stringify(updateData, null, 2));
          console.log('updated');
          await updateProfileOutput(updateData);
          navigate(`/minigame/result?time=${event.data.data}`);
          const res = await getUserDetailsAPI();
          if (res) {
            dispatch(setUserDetails(res?.data));
          }
        } catch (error) {
          alert('Failed to update profile');
        }
      }
    };

    window.addEventListener('message', handleGameMessage);
    return () => window.removeEventListener('message', handleGameMessage);
  }, [navigate]);

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header previous={true} />
      </div>
      <div className="relative overflow-hidden z-[3] pb-[73px]">
        <img
          src={gameBackground}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />
        <div className="pt-[100px] w-[90%] mx-auto flex flex-col relative z-[2] ">
          <iframe
            src="../../../Card Flipping Game/index.html"
            // src="/game/index.html"
            title="Game"
            className="w-full h-[402px]"
          ></iframe>
          <img src={howTo} alt="How To" className="pt-5" />
        </div>
        <HotLineButton top="top-[80%]" />
        <div className="footer-div">
          <div className="relative z-40 w-full mx-auto text-center my-3">
            <ButtonComponent
              buttonText="UPLOAD RECEIPT"
              buttonType="button"
              buttonClass="button-component"
              navigateTo="/upload"
            />
          </div>
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

export default MiniGame;
