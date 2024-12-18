import reward688 from '../../assets/images/reward-6.88.png';
import reward1888 from '../../assets/images/reward-18.88.png';
import reward3888 from '../../assets/images/reward-38.88.png';
import reward8888 from '../../assets/images/reward-88.88.png';

interface RewardModalProps {
  reward: string;
  isOpen: boolean;
  onClose: () => void;
}

function RewardModal({ reward, isOpen, onClose }: RewardModalProps) {
  if (!isOpen) return null;

  const getRewardImage = () => {
    switch (reward) {
      case '6.88':
        return reward688;
      case '18.88':
        return reward1888;
      case '38.88':
        return reward3888;
      case '88.88':
        return reward8888;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pb-[73px]">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="relative w-full max-w-lg">
        <img
          src={getRewardImage()}
          alt={`Reward ${reward}`}
          className="w-full h-auto"
        ></img>
        <div
          className="absolute rounded-3xl w-[12vw] h-[12vw] top-[1vw] right-[5vw] z-50"
          onClick={onClose}
        ></div>
      </div>
    </div>
  );
}

export default RewardModal;