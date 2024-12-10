import cnyBody from '../../assets/images/cny-body.webp';
import cnyTop from '../../assets/images/cny-top.png';
import matchWin from '../../assets/images/match-and-win.png';
import playRedeem from '../../assets/images/play-and-redeem.png';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Home: React.FC = () => {

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full" />
      </div>

      <div className="relative -mt-[115px] overflow-hidden z-[3] pb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />
        <div className="pt-[130px] pb-[20px] flex flex-col items-center justify-between relative z-[2]">
          <div className="grid flex-grid grid-cols-2 gap-2 w-[90%] mx-auto">
            <div className="relative">
              <img src={playRedeem} className="h-[191px] mx-auto"></img>
            </div>
            <div className="relative">
              <img src={matchWin}></img>
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
                />
              </div>
            </div>
            <div className="relative">
              <div className="z-40 w-full mx-auto text-center top-[140px]">
                <ButtonComponent
                  buttonText="GRAND PRIZES"
                  buttonType="button"
                  buttonClass="blue-button"
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
                />
                <p className="text-white underline mt-2">Terms & Conditions</p>
              </div>
            </div>
            <div className="relative">
              <div className="z-40 w-full mx-auto text-center top-[140px]">
                <ButtonComponent
                  buttonText="HOW TO JOIN"
                  buttonType="button"
                  buttonClass="home-button"
                />
                <p className="text-white underline mt-2">Privacy Policy</p>
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
