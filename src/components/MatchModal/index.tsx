import React from 'react';
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
    <div className="absolute inset-0 overflow-y-auto bg-[rgba(0,0,0,0.5)] z-[80]">
      <div className="flex items-center justify-center min-h-screen z-[90]">
        <div className="match-background relative flex flex-col py-[4rem] px-[3rem] box-border z-[100]">
          <div className="flex flex-col justify-center items-center w-[80%] mt-[3rem]">
            <img src={YouWin} alt="You Win" />
            <p className="text-[#A11A20] font-bold text-base mt-3 mb-0.5">TIME</p>
            <div className="flex flex-col justify-center items-center">
              <img src={TimeBg}></img>
              <p className="text-[#A11A20] font-bold text-[32px] absolute">{time}</p>
            </div>
            <img src={WinAptamil} className="w-[80%] mt-4"></img>
          </div>
          <p className="text-sm text-center my-4 w-[90%] leading-4">
            Aptamil<sup>TM</sup> KID products are formulated with <strong>Synbio</strong>,
            a combination of{' '}
            <strong>
              <i>B. Breve</i> M-16V probiotic
            </strong>{' '}
            and a unique mix of <strong>GOS/lcFOS (9:1) prebiotics</strong>, with{' '}
            <strong>5 brain nutrients*</strong> for your child's immunity & brain
            development
          </p>

          <div className="text-center text-xs pb-4">
            <p>
              *Sphingomyelin, Omega 3, 6, 9, Vitamin B12, <br /> Tryptophan, DHA are found
              in the brain
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <img src={replay} className="w-[18%]" onClick={()=>{navigate('/minigame'); onClose();}}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchModal;
