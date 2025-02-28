import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import cnyTop from '../../assets/gif/cny-animation.gif';
// import checkmark from '../../assets/images/checkmark.png';
import cnyBody from '../../assets/images/cny-body.webp';
import matchWin from '../../assets/images/match-and-win.png';
import playRedeem from '../../assets/images/play-and-redeem.png';
import TnCPDF from '../../assets/pdf/TnC.pdf';
import ButtonComponent from '../../components/ButtonComponent';
import EndModal from '../../components/EndModal';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';

// import Modal from '../../components/Modal';
// import { getRewardStock } from '../../services';
// import { getUserDetailsAPI } from '../../services/authService';
// import { useAppDispatch } from '../../store/hooks';
// import { setUserDetails } from '../../store/userSlice';

const Home: React.FC = () => {
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const [isRewardsDisabled, setRewardsDisabled] = useState(true);
  // const [oos, setOos] = useState(false);
  const [end, setEnd] = useState(true);

  // const rewardIdsList = [
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_688,
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_1888,
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_3888,
  //   import.meta.env.VITE_APP_GAMES_TNG_REWARD_8888,
  // ];

  // const handleGetRewardStock = async () => {
  //   const gotStock = await getRewardStock(rewardIdsList);
  //   if (gotStock) {
  //     const outOfStock = (gotStock.data as { isValid: boolean }[]).every(
  //       (item: { isValid?: boolean }) => !item.isValid
  //     );

  //     if (!outOfStock) return navigate('/playandredeem');
  //     else setOos(true);
  //   }
  // };

  // useEffect(() => {
  //   const getUserDetails = async () => {
  //     const res = await getUserDetailsAPI();
  //     if (res) {
  //       dispatch(setUserDetails(res?.data));
  //     }
  //   };

  //   const checkStock = async () => {
  //     const gotStock = await getRewardStock(rewardIdsList);
  //     if (gotStock) {
  //       const outOfStock = (gotStock.data as { isValid: boolean }[]).every(
  //         (item: { isValid?: boolean }) => !item.isValid
  //       );

  //       setRewardsDisabled(outOfStock);
  //     }
  //   };

  //   checkStock();
  //   getUserDetails();
  // }, []);

  return (
    <div id="page" className="overflow-y-auto">
      <div className="container relative mx-auto max-w-[600px]">
        <div className="fixed z-50 flex w-full justify-between">
          <Header />
        </div>
        <HotLineButton noHeader noFooter />
        <div className="relative z-[2]">
          <img src={cnyTop} alt="gif" className="relative bottom-7 flex size-full" />
        </div>

        <div className="relative z-[3] -mt-[130px] mb-[73px] overflow-hidden">
          <img
            src={cnyBody}
            alt="main-bg"
            className="absolute left-0 top-0 min-h-screen w-full"
          />
          <div className="relative z-[2] flex flex-col items-center justify-between pb-[20px] pt-[14vh]">
            <div className="flex-grid mx-auto grid h-[170px] w-[90%] grid-cols-2 gap-2">
              <div className="relative size-full" onClick={() => setEnd(true)}>
                <img
                  src={playRedeem}
                  className="absolute inset-0 mx-auto h-full w-auto cursor-pointer object-contain"
                ></img>
              </div>
              <div className="relative size-full" onClick={() => setEnd(true)}>
                <img
                  src={matchWin}
                  className="absolute inset-0 mx-auto h-full w-auto cursor-pointer object-contain"
                ></img>
              </div>
            </div>
          </div>
          <div className="footer-div">
            <div className="flex-grid mx-auto grid w-[90%] grid-cols-2 gap-2">
              <div className="relative">
                <div className="top-[140px] z-40 mx-auto w-full text-center">
                  <ButtonComponent
                    buttonText="GUARANTEED REWARDS"
                    buttonType="button"
                    buttonClass="blue-button"
                    buttonFunction={() => setEnd(true)}
                    // disabled={isRewardsDisabled}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="top-[140px] z-40 mx-auto w-full text-center">
                  <ButtonComponent
                    buttonText="GRAND PRIZES"
                    buttonType="button"
                    buttonClass="blue-button"
                    // navigateTo="/minigame"
                    buttonFunction={() => setEnd(true)}
                  />
                </div>
              </div>
            </div>
            <div className="relative z-40 mx-auto my-3 w-full text-center">
              <ButtonComponent
                buttonText="UPLOAD RECEIPT"
                buttonType="button"
                buttonClass="button-component"
                // navigateTo="/upload"
                buttonFunction={() => setEnd(true)}
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
                  <a href={TnCPDF} target="_blank" rel="noreferrer">
                    <p className="gotham-light mt-2 text-sm text-white underline">
                      Terms & Conditions
                    </p>
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
                    <p className="gotham-light mt-2 text-sm text-white underline">
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

      {/* {oos && (
        <Modal
          logo={checkmark}
          title="Sorry.."
          body="All vouchers have been fully redeemed. Not to worry, you can still play the mini game and stand a chance to win our grand prizes!"
          buttonText="PLAY NOW"
          buttonClass="bg-[#001489] hover:bg-blue-700"
          onClose={() => navigate('/minigame')}
          // navigateTo="/upload"
        />
      )} */}

      {end ? <EndModal onClose={() => setEnd(false)} /> : null}
    </div>
  );
};

export default Home;
