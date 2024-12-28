import { useNavigate } from 'react-router-dom';

import replay from '../../assets/images/replay.png';
import TimeBg from '../../assets/images/time-background.png';
import WinAptamil from '../../assets/images/win-aptamil.png';
import YouWin from '../../assets/images/you-win.png';

interface ModalProps {
  time: string;
  onClose: () => void;
}

function MatchModal({ time, onClose }: ModalProps) {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-[80] overflow-y-auto bg-[rgba(0,0,0,0.5)]">
      <div className="z-[90] flex min-h-screen items-center justify-center">
        <div className="match-background relative z-[100] box-border flex flex-col px-12 py-16 max-w-[600px]">
          <div className="mt-12 flex w-4/5 flex-col items-center justify-center">
            <img src={YouWin} alt="You Win" />
            <p className="mb-0.5 mt-3 text-base font-bold text-[#A11A20]">TIME</p>
            <div className="flex flex-col items-center justify-center">
              <img src={TimeBg}></img>
              <p className="absolute text-[32px] font-bold text-[#A11A20]">{time}</p>
            </div>
            <img src={WinAptamil} className="mt-4 w-4/5"></img>
          </div>
          <p className="my-4 w-[90%] text-center text-sm leading-4">
            Aptamil<sup>TM</sup> KID products are formulated with <strong>Synbio</strong>,
            a combination of{' '}
            <strong>
              <i>B. Breve</i> M-16V probiotic
            </strong>{' '}
            and a unique mix of <strong>GOS/lcFOS (9:1) prebiotics</strong>, with{' '}
            <strong>5 brain nutrients*</strong> for your child's immunity & brain
            development
          </p>

          <div className="pb-4 text-center text-xs px-3">
            <p>
              *Sphingomyelin, Omega 3, 6, 9, Vitamin B12, Tryptophan, DHA are found
              in the brain
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <img
              src={replay}
              className="w-[18%] cursor-pointer"
              onClick={() => {
                navigate('/minigame');
                onClose();
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchModal;
