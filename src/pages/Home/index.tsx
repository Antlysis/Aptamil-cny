import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import cnyTop from '../../assets/gif/cny-animation.gif';
import cnyBody from '../../assets/images/cny-body.webp';
import matchWin from '../../assets/images/match-and-win.png';
import playRedeem from '../../assets/images/play-and-redeem.png';
import TnCPDF from '../../assets/pdf/TnC.pdf';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import { getRewardStock } from '../../services';
import { getUserDetailsAPI } from '../../services/authService';
import { useAppDispatch } from '../../store/hooks';
import { setUserDetails } from '../../store/userSlice';

const Home: React.FC = () => {
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isRewardsDisabled, setRewardsDisabled] = useState(true);

  const rewardIdsList = [
    import.meta.env.VITE_APP_GAMES_TNG_REWARD_688,
    import.meta.env.VITE_APP_GAMES_TNG_REWARD_1888,
    import.meta.env.VITE_APP_GAMES_TNG_REWARD_3888,
    import.meta.env.VITE_APP_GAMES_TNG_REWARD_8888,
  ];

  const handleGetRewardStock = async () => {
    const gotStock = await getRewardStock(rewardIdsList);
    if (gotStock) {
      navigate('/playandredeem');
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await getUserDetailsAPI();
      if (res) {
        dispatch(setUserDetails(res?.data));
      }
    };

    const checkStock = async () => {
      const gotStock = await getRewardStock(rewardIdsList);
      setRewardsDisabled(!gotStock);
    };

    checkStock();
    getUserDetails();
  }, []);

  return (
    <div id="page" className="overflow-y-auto">
      <div className="container mx-auto max-w-[600px] relative">
        <div className="fixed flex justify-between w-full z-50">
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
              <div
                className="relative h-full w-full"
                onClick={() => navigate('/minigame')}
              >
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
                    disabled={isRewardsDisabled}
                    buttonFunction={handleGetRewardStock}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="z-40 w-full mx-auto text-center top-[140px]">
                  <ButtonComponent
                    buttonText="GRAND PRIZES"
                    buttonType="button"
                    buttonClass="blue-button"
                    navigateTo="/minigame"
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
                  <a href={TnCPDF} target="_blank" rel="noreferrer">
                    <p className="text-white underline mt-2 text-sm gotham-light">
                      Terms & Conditions
                    </p>
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
                    <p className="text-white underline mt-2 text-sm gotham-light">
                      Privacy Policy
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
