import { useEffect, useRef } from 'react';

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
  const myIframe = useRef<HTMLIFrameElement>(null);
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;

  useEffect(() => {
    let processing = false;

    const handleGameMessage = async (event: MessageEvent) => {
      if (!processing && event.data.action === 'gameCompleted') {
        processing = true;
        console.log('processed from message event');
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

          await updateProfileOutput(updateData);
          const res = await getUserDetailsAPI();
          if (res) {
            dispatch(setUserDetails(res?.data));
          }
          navigate(`/minigame/result?time=${event.data.data}`);
        } catch (error) {
          navigate(`/minigame/result?time=${event.data.data}`);
        }
      }
    };

    // fallback function if window message event is not triggered
    const storageEventListener = async (event: StorageEvent) => {
      if (!processing && event.key === 'gameCompleted') {
        processing = true;
        console.log('processed from storage event');
        const timer = parseInt(event.newValue || '0');
        try {
          const existingMinigame =
            userDetails?.data?.personalInfo?.extendedFields?.minigame || [];

          const updatedMinigame = [
            ...existingMinigame,
            {
              date: new Date().toLocaleString('en-GB'),
              timer,
            },
          ];

          const updateData = {
            values: {
              extendedFields: {
                minigame: updatedMinigame,
              },
            },
          };

          await updateProfileOutput(updateData);
          const res = await getUserDetailsAPI();
          if (res) {
            dispatch(setUserDetails(res?.data));
          }
          navigate(`/minigame/result?time=${timer}`);
        } catch (error) {
          navigate(`/minigame/result?time=${timer}`);
        }
      }
    };

    const checkInterval = setInterval(async () => {
      if (!processing) {
        const iframe = myIframe.current;
        if (iframe) {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

          const gameCompleteDiv = iframeDoc?.querySelector('#game-complete');

          if (gameCompleteDiv) {
            const divDisplay = (gameCompleteDiv as HTMLElement).style.display;

            if (divDisplay === 'block') {
              clearInterval(checkInterval);
              processing = true;
              console.log('processed from interval');
              const timer = parseInt(
                (gameCompleteDiv as HTMLElement).getAttribute('data-time') || '0'
              );

              try {
                const existingMinigame =
                  userDetails?.data?.personalInfo?.extendedFields?.minigame || [];

                const updatedMinigame = [
                  ...existingMinigame,
                  {
                    date: new Date().toLocaleString('en-GB'),
                    timer,
                  },
                ];

                const updateData = {
                  values: {
                    extendedFields: {
                      minigame: updatedMinigame,
                    },
                  },
                };

                await updateProfileOutput(updateData);
                const res = await getUserDetailsAPI();
                if (res) {
                  dispatch(setUserDetails(res?.data));
                }
                navigate(`/minigame/result?time=${timer}`);
              } catch (error) {
                navigate(`/minigame/result?time=${timer}`);
              }
            }
          } else {
            const iframeUrl = iframe.contentWindow?.location.href;
            if (iframeUrl?.includes('/minigame/result?time=')) {
              clearInterval(checkInterval);
              processing = true;

              const timer = parseInt(iframeUrl.split('=')[1] || '0');

              try {
                const existingMinigame =
                  userDetails?.data?.personalInfo?.extendedFields?.minigame || [];

                const updatedMinigame = [
                  ...existingMinigame,
                  {
                    date: new Date().toLocaleString('en-GB'),
                    timer,
                  },
                ];

                const updateData = {
                  values: {
                    extendedFields: {
                      minigame: updatedMinigame,
                    },
                  },
                };

                await updateProfileOutput(updateData);
                const res = await getUserDetailsAPI();
                if (res) {
                  dispatch(setUserDetails(res?.data));
                }
                navigate(`/minigame/result?time=${timer}`);
              } catch (error) {
                navigate(`/minigame/result?time=${timer}`);
              }
            }
          }
        }
      }
    }, 10);

    window.addEventListener('message', handleGameMessage);
    window.addEventListener('storage', storageEventListener);
    return () => {
      window.removeEventListener('message', handleGameMessage);
      window.removeEventListener('storage', storageEventListener);

      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex w-full justify-between">
        <Header previous={true} />
      </div>
      <div className="relative z-[3] overflow-hidden">
        <img
          src={gameBackground}
          alt="main-bg"
          className="absolute left-0 top-0 min-h-screen w-full"
        />
        <div className="relative z-[2] mx-auto flex w-[90%] flex-col pt-[100px] ">
          <iframe
            src="../../../contest/Card Flipping Game/index.html"
            // src="./game/index.html"
            title="Game"
            className="h-[402px] w-full"
            ref={myIframe}
          ></iframe>
          <img src={howTo} alt="How To" className="pt-5" />
        </div>
        <HotLineButton noHeader noFooter />
        <div className="footer-div">
          <div className="relative z-40 mx-auto my-3 w-full text-center">
            <ButtonComponent
              buttonText="UPLOAD RECEIPT"
              buttonType="button"
              buttonClass="button-component"
              navigateTo="/upload"
            />
          </div>
          <div className="flex-grid mx-auto grid w-[90%] grid-cols-2 gap-2">
            <div className="relative">
              <div className="top-[140px] z-40 mx-auto w-full text-center">
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
                  <p className="mt-2 text-white underline">Terms & Conditions</p>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="top-[140px] z-40 mx-auto w-full text-center">
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
                  <p className="mt-2 text-white underline">Privacy Policy</p>
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
