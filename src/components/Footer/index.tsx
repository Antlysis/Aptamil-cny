import homeLogoFooter from '../../assets/images/svg/homeLogoFooter.svg';
import profileLogoFooter from '../../assets/images/svg/profileLogoFooter.svg';
import rewardLogoFooter from '../../assets/images/svg/rewardLogoFooter.svg';

const Footer = () => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;

  return (
    <div className="fixed bottom-0 flex h-[73px] w-full max-w-[600px] items-center justify-around bg-white pt-1 z-50">
      <div
        onClick={() => handleNavigation(`${aptamilCampaign}/homepage`)}
        className="cursor-pointer"
      >
        <div className="grid h-full grid-rows-2">
          <div className="flex items-center justify-center">
            <img src={homeLogoFooter} alt="Home" />
          </div>
          <p className="gray-color gotham-font">HOME</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation(`${aptamilCampaign}/rewards`)}
        className="cursor-pointer"
      >
        <div className="grid h-full grid-rows-2">
          <div className="flex items-center justify-center">
            <img src={rewardLogoFooter} alt="Rewards" />
          </div>
          <p className="gray-color gotham-font">REWARDS</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation(`${aptamilCampaign}/profile`)}
        className="cursor-pointer"
      >
        <div className="grid h-full grid-rows-2">
          <div className="flex items-center justify-center">
            <img src={profileLogoFooter} alt="Profile" />
          </div>
          <p className="gray-color gotham-font">PROFILE</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
