import voice from '../../assets/images/voice.png';

const EndModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(0,0,0,0.5)]">
      <div className="mx-auto flex min-h-screen max-w-[600px] items-center justify-center">
        <div className="mx-auto w-[90%] rounded-[10px] bg-white p-8 shadow-md">
          <div className="flex justify-center">
            <img src={voice} alt="voice" className="w-1/2" />
          </div>

          <h2 className="mt-4 text-center text-xl font-bold">🚨 CAMPAIGN ENDED! 🚨</h2>

          <p className="mt-2 text-center">
            Thank you for your participation!
            <br />
            The campaign has officially ended. Stay tuned for the winner announcement! 🎉
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="w-full rounded-[36px] bg-slate-400 px-4 py-2 text-lg font-bold text-white"
              onClick={() => onClose()}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
