import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import cnyTop from '../../assets/gif/cny-animation.gif';
import pdfIcon from '../../assets/images/PDFicon.png';
import cnyBody from '../../assets/images/cny-body.webp';
import successLogo from '../../assets/images/svg/successLogo.svg';
import trashLogo from '../../assets/images/svg/trashLogo.svg';
import uploadLogo from '../../assets/images/svg/uploadLogo.svg';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { checkValidity, createEntry, uploadImage } from '../../services/index';
import HotLineButton from '../../components/HotlineButton';
interface ImageData {
  name: string;
  size: string;
  data: string;
  fileType: string;
}

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const campaignId = import.meta.env.VITE_APP_CAMPAIGN_ID;
  const rewardId = import.meta.env.VITE_APP_REWARD_ID;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files ? e.target.files[0] : '';
    if (uploadedFile) {
      const fileType = uploadedFile.type;
      const fileSize = uploadedFile.size;
      const name = uploadedFile.name;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(fileType)) {
        alert('Please upload a valid image or PDF file.');
        return;
      }

      const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseInt((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      };

      const size = formatFileSize(fileSize);
      const data = URL.createObjectURL(uploadedFile);
      setImageData({ name, size, data, fileType });
      setFile(uploadedFile);
    }
  };

  const deleteImage = () => {
    setFile(null);
    setImageData(null);
  };

  useEffect(() => {
    const fetchValidity = async () => {
      try {
        const result = await checkValidity();
        if (result) {
          setIsValid(result?.isValid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchValidity();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (file) {
      const data = new FormData();
      data.append('image', file);

      try {
        const uploadImageResponse = await uploadImage(data);
        if (uploadImageResponse && uploadImageResponse.data?.data.url) {
          let entryData = {
            campaignId: campaignId,
            type: 'RECEIPT',
            selectedRewardIds: [rewardId],
            data: {
              imageData: {
                url: uploadImageResponse.data?.data.url,
                key: uploadImageResponse.data?.data.key,
              },
              receiptData: {},
            },
          };
          const entryResponse = await createEntry(entryData);
          if (entryResponse && entryResponse.data?.id) {
            deleteImage();
            setLoading(false);
            setIsModalOpen(true);
          } else {
            setLoading(false);
            deleteImage();
          }
        }
      } catch (error) {
        console.log('Upload failed', error);
        deleteImage();
        setLoading(false);
      }
    } else {
      alert('No receipt was uploaded');
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header previous={true} />
      </div>
      <HotLineButton></HotLineButton>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full flex relative bottom-7" />
      </div>

      <div className="relative -mt-[125px] overflow-hidden z-[3] pb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative w-[80%] mx-auto">
          <p className="text-white text-[26px] font-bold pt-3">Upload Receipt</p>
          <p className="heading-2 text-center">Upload photos of your receipt</p>

          <form className="text-center w-full" onSubmit={handleSubmit}>
            <div
              className="h-[150px] mt-4 border-dashed border-2 rounded-[10px] content-center text-center cursor-pointer inset-0"
              style={{ backgroundColor: '#7D1A21' }}
            >
              <input
                type="file"
                className="absolute inset-0 h-[150px] opacity-0 mt-[200px]"
                onChange={handleUpload}
                accept="image/jpeg,image/jpg,image/png,application/pdf"
              />
              <img src={uploadLogo} className="mx-auto" alt="Upload" />
              <p className="my-2 mx-auto text-white font-bold underline text-[16px]">
                Click to Upload
              </p>
              <p className="mx-auto text-white text-[12px]">
                *Supported formats: PDF, JPEG, JPG, PNG only
              </p>
            </div>
            <div className="upload details">
              {file && imageData ? (
                <div className="bg-white flex w-full h-20 my-5 rounded-md overflow-hidden">
                  <div className="w-[20vw] h-full bg-gray-300 flex justify-center items-center mr-2">
                    <img
                      src={
                        imageData.fileType === 'application/pdf'
                          ? pdfIcon
                          : imageData.data
                      }
                      alt="receipt"
                      className="max-w-full max-h-full m-auto"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center flex-1 w-full">
                    <p className="font-bold text-left w-full">{imageData.name}</p>
                    <p className="font-light text-gray-400 text-left w-full">
                      {imageData.size}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="w-[15vw] h-full flex justify-center items-center"
                    onClick={deleteImage}
                  >
                    <img src={trashLogo} alt="trash" />
                  </button>
                </div>
              ) : null}
            </div>
            <ButtonComponent
              buttonText="SUBMIT RECEIPT"
              buttonType="submit"
              buttonClass="button-component top-[190px] relative z-[45]"
              disabled={loading}
              filePresent={!!file}
            />
          </form>
        </div>

        <div className="footer-div">
          <div className="absolute z-40 w-full mx-auto text-center top-[140px]"></div>
        </div>
        <Footer />

        {isModalOpen && (
          <Modal
            logo={successLogo}
            title="Successful!"
            body="Your receipts have been successfully uploaded and will be validated within 5 working days."
            buttonText="OK"
            buttonClass="bg-[#02BC7D] hover:bg-green-700"
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Upload;
