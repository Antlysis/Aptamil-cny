import { useState } from 'react';

import cnyTop from '../../assets/gif/cny-animation.gif';
import pdfIcon from '../../assets/images/PDFicon.png';
import cnyBody from '../../assets/images/cny-body.webp';
import successLogo from '../../assets/images/svg/successLogo.svg';
import trashLogo from '../../assets/images/svg/trashLogo.svg';
import uploadLogo from '../../assets/images/svg/uploadLogo.svg';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotLineButton from '../../components/HotlineButton';
import Modal from '../../components/Modal';
import { createEntry, uploadImage } from '../../services/index';

interface ImageData {
  name: string;
  size: string;
  data: string;
  fileType: string;
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  // const [isValid, setIsValid] = useState(false);
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

  // useEffect(() => {
  //   const fetchValidity = async () => {
  //     try {
  //       const result = await checkValidity();
  //       if (result) {
  //         setIsValid(result?.isValid);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchValidity();
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (file) {
      const data = new FormData();
      data.append('image', file);

      try {
        const uploadImageResponse = await uploadImage(data);
        if (uploadImageResponse && uploadImageResponse.data?.data.url) {
          const entryData = {
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
      <div className="absolute flex w-full justify-between">
        <Header previous={true} />
      </div>
      <HotLineButton noHeader noFooter />
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="relative bottom-7 flex size-full" />
      </div>

      <div className="relative z-[3] -mt-[130px] overflow-hidden mb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute left-0 top-0 min-h-screen w-full"
        />

        <div className="relative mx-auto flex w-4/5 flex-col items-center justify-between pt-[110px]">
          <p className="pt-3 text-[26px] font-bold text-white">Upload Receipt</p>
          <p className="heading-2 text-center">Upload a photo of your receipt</p>

          <form className="w-full text-center" onSubmit={handleSubmit}>
            <div
              className="inset-0 mt-4 h-[170px] cursor-pointer content-center rounded-[10px] border-2 border-dashed text-center"
              style={{ backgroundColor: '#7D1A21' }}
            >
              <input
                type="file"
                className="absolute inset-0 mt-[200px] h-[150px] opacity-0"
                onChange={handleUpload}
                accept="image/jpeg,image/jpg,image/png,application/pdf"
              />
              <img src={uploadLogo} className="mx-auto" alt="Upload" />
              <p className="mx-auto my-2 text-base font-bold text-white underline">
                Click to Upload
              </p>
              <p className="mx-auto text-xs text-white gotham-book">
                *Supported formats: PDF, JPEG, JPG, PNG only
              </p>
            </div>
            <div className="upload details">
              {file && imageData ? (
                <div className="my-5 flex h-20 w-full overflow-hidden rounded-md bg-white">
                  <div className="mr-2 flex h-full w-[20vw] items-center justify-center bg-gray-300">
                    <img
                      src={
                        imageData.fileType === 'application/pdf'
                          ? pdfIcon
                          : imageData.data
                      }
                      alt="receipt"
                      className="m-auto max-h-full max-w-full"
                    />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center">
                    <p className="w-full text-left font-bold">{imageData.name}</p>
                    <p className="w-full text-left font-light text-gray-400">
                      {imageData.size}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex h-full w-[15vw] items-center justify-center"
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
          <div className="absolute top-[140px] z-40 mx-auto w-full text-center"></div>
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
