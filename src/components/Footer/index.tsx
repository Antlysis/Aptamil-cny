import { NavLink } from 'react-router-dom';

import homeLogoFooter from '../../assets/images/svg/homeLogoFooter.svg';
import profileLogoFooter from '../../assets/images/svg/profileLogoFooter.svg';
import rewardLogoFooter from '../../assets/images/svg/rewardLogoFooter.svg';

const Footer = () => {
  return (
    <div className="fixed bottom-0 flex h-[73px] w-full max-w-[600px] items-center justify-around bg-white pt-1 z-40">
      <NavLink to="/homepage">
        <div className="grid h-full grid-rows-2">
          <div className="flex items-center justify-center">
            <img src={homeLogoFooter}></img>
          </div>
          <p className="gray-color gotham-font">HOME</p>
        </div>
      </NavLink>
      <NavLink to="/rewards">
        <div className="grid h-full grid-rows-2">
          <div className="flex items-center justify-center">
            <img src={rewardLogoFooter}></img>
          </div>
          <p className="gray-color gotham-font">REWARDS</p>
        </div>
      </NavLink>
      <NavLink to="/profile">
        <div className="grid h-full grid-rows-2">
          <div className="flex items-center justify-center">
            <img src={profileLogoFooter}></img>
          </div>
          <p className="gray-color gotham-font">PROFILE</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Footer;
