import { useNavigate } from 'react-router-dom';
import aptamilKidLogo from '../../assets/images/svg/aptamilKidLogo.svg';

interface HeaderProps {
  previous?: boolean;
}

const Header: React.FC<HeaderProps> = ({ previous = false }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex h-16 w-full items-center justify-between p-4 relative z-20">
      {previous && (
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="#BB3134"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.82496 0.174805L9.47487 1.82472L4.466 6.83297L19.8333 6.8331V9.16643L4.466 9.1663L9.47487 14.1748L7.82496 15.8247L0 7.99976L7.82496 0.174805Z"
              fill="#BB3134"
            />
          </svg>
        </div>
      )}
      {!previous && <div className="w-5" />} 
      <img src={aptamilKidLogo} alt="Aptamil Kid Logo" />
    </div>
  );
};

export default Header;