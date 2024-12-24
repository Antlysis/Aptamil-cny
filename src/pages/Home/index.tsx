import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import cnyTop from '../../assets/gif/cny-animation.gif';
import cnyBody from '../../assets/images/cny-body.webp';
import matchWin from '../../assets/images/match-and-win.png';
import playRedeem from '../../assets/images/play-and-redeem.png';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import { getUserDetailsAPI } from '../../services/authService';
import { useAppDispatch } from '../../store/hooks';
import { setUserDetails } from '../../store/userSlice';

const Home: React.FC = () => {
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await getUserDetailsAPI();
      if (res) {
        dispatch(setUserDetails(res?.data));
      }
    };
    getUserDetails();
  }, []);

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <HotLineButton></HotLineButton>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full flex relative bottom-7" />
      </div>

      <div className="relative -mt-[125px] overflow-hidden z-[3] pb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />
        <div className="pt-[130px] pb-[20px] flex flex-col items-center justify-between relative z-[2]">
          <div className="grid flex-grid grid-cols-2 gap-2 h-[170px] w-[90%] mx-auto">
            <div
              className="relative h-full w-full"
              onClick={() => navigate('/playandredeem')}
            >
              <img
                src={playRedeem}
                className="h-full w-auto mx-auto object-contain absolute inset-0"
              ></img>
            </div>
            <div className="relative h-full w-full" onClick={() => navigate('/minigame')}>
              <img
                src={matchWin}
                className="h-full w-auto mx-auto object-contain absolute inset-0"
              ></img>
            </div>
          </div>
        </div>
        <div className="footer-div">
          <div className="grid flex-grid grid-cols-2 gap-2 w-[90%] mx-auto">
            <div className="relative">
              <div className="z-40 w-full mx-auto text-center top-[140px]">
                <ButtonComponent
                  buttonText="GUARANTEED REWARDS"
                  buttonType="button"
                  buttonClass="blue-button"
                  navigateTo={'/playandredeem'}
                />
              </div>
            </div>
            <div className="relative">
              <div className="z-40 w-full mx-auto text-center top-[140px]">
                <ButtonComponent
                  buttonText="GRAND PRIZES"
                  buttonType="button"
                  buttonClass="blue-button"
                  navigateTo={'/minigame'}
                />
              </div>
            </div>
          </div>
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

export default Home;
