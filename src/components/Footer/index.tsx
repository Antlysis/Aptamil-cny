import homeLogoFooter from '../../assets/images/svg/homeLogoFooter.svg';
import profileLogoFooter from '../../assets/images/svg/profileLogoFooter.svg';
import rewardLogoFooter from '../../assets/images/svg/rewardLogoFooter.svg';

const Footer = () => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };
  const aptamilCampaign = import.meta.env.VITE_APP_APTAMIL;

  return (
    <div className="fixed bottom-0 flex h-[73px] w-full max-w-[600px] items-center justify-center bg-white pt-1 z-50">
      <div className="flex w-full justify-evenly">
        <div
          onClick={() => handleNavigation(`${aptamilCampaign}/homepage`)}
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="flex items-center justify-center">
            <img src={homeLogoFooter} alt="Home" className="mx-auto" />
          </div>
          <p className="gray-color gotham-book text-sm text-center">HOME</p>
        </div>
        <div
          onClick={() => handleNavigation(`${aptamilCampaign}/rewards`)}
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="flex items-center justify-center">
            <img src={rewardLogoFooter} alt="Rewards" className="mx-auto mt-1 mb-1.5" />
          </div>
          <p className="gray-color gotham-book text-sm text-center">REWARDS</p>
        </div>
        <div
          onClick={() => handleNavigation(`${aptamilCampaign}/profile`)}
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="flex items-center justify-center">
            <img src={profileLogoFooter} alt="Profile" className="mx-auto" />
          </div>
          <p className="gray-color gotham-book text-sm text-center">PROFILE</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;