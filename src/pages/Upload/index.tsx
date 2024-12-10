import { useRef, useState } from 'react';

import cnyBody from '../../assets/images/cny-body.webp';
import cnyTop from '../../assets/images/cny-top.png';
import successLogo from '../../assets/images/svg/successLogo.svg';
import trashLogo from '../../assets/images/svg/trashLogo.svg';
import uploadLogo from '../../assets/images/svg/uploadLogo.svg';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

interface FileWithPreview {
  file: File;
  preview: string;
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDisplayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) return;

    setError('');

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const invalidFiles = selectedFiles.filter(file => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError(
        'Some files were not added. Only PDF, JPEG, JPG, or PNG files are supported.'
      );
      return;
    }

    const processFile = (file: File): Promise<FileWithPreview> => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          resolve({
            file,
            preview: e.target?.result as string,
          });
        };
        reader.readAsDataURL(file);
      });
    };

    Promise.all(selectedFiles.map(processFile)).then(newFiles => {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmitReceipts = async () => {
    if (files.length === 0) {
      setError('Please select at least one file.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      files.forEach((fileData, index) => {
        formData.append(`receipt${index}`, fileData.file);
      });

      // Your API call here
      // await uploadFiles(formData);

      setFiles([]);
    } catch (uploadError) {
      setError('Upload failed. Please try again.');
      console.error(uploadError);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header previous={true} />
      </div>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full" />
      </div>

      <div className="relative -mt-[115px] overflow-hidden z-[3] pb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative w-[80%] mx-auto">
          <p className="text-white text-[26px] font-bold pt-3">Upload Receipts</p>
          <p className="heading-2 text-center">Upload photos of your receipts</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleDisplayImage}
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            className="hidden"
            multiple
          />

          <div
            onClick={triggerFileInput}
            className="w-full h-[150px] mt-4 border-dashed border-2 rounded-[10px] content-center text-center cursor-pointer"
            style={{ backgroundColor: '#7D1A21' }}
          >
            <img src={uploadLogo} className="mx-auto" alt="Upload" />
            <p className="my-2 mx-auto text-white font-bold underline text-[16px]">
              Click to Upload
            </p>
            <p className="mx-auto text-white text-[12px]">
              *Supported formats: PDF, JPEG, JPG, PNG only
            </p>
          </div>

          {files.map((fileData, index) => (
            <div key={index} className="w-full mt-4">
              {fileData.file.type.startsWith('image/') ? (
                <div className="bg-white text-left mt-2 rounded-[10px] flex flex-row items-center">
                  <div className="w-[20%] h-[80px] bg-gray-200 flex items-center justify-center p-2 rounded-l-[10px]">
                    <img
                      src={fileData.preview}
                      alt="Receipt Preview"
                      className="w-auto h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col p-2 flex-grow justify-center">
                    <p className="text-black font-bold">{fileData.file.name}</p>
                    <p className="text-gray-500 mt-1">
                      {formatFileSize(fileData.file.size)}
                    </p>
                  </div>
                  <div className="pr-4 pl-2">
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 hover:opacity-70"
                    >
                      <img src={trashLogo} alt="Delete" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="bg-white text-left mt-2 rounded-[10px] flex flex-row items-center">
                    <div className="w-[20%] h-[80px] bg-gray-200 flex items-center justify-center p-2 rounded-l-[10px]">
                      <iframe
                        src={fileData.preview}
                        title="PDF Preview"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-2 flex-grow justify-center">
                      <p className="text-black font-bold">{fileData.file.name}</p>
                      <p className="text-gray-500 mt-1">
                        {formatFileSize(fileData.file.size)}
                      </p>
                    </div>
                    <div className="pr-4 pl-2">
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 hover:opacity-70"
                      >
                        <img src={trashLogo} alt="Delete" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>

        <div className="footer-div">
          <div className="absolute z-40 w-full mx-auto text-center top-[140px]">
            <ButtonComponent
              buttonText="SUBMIT RECEIPTS"
              buttonType="submit"
              buttonClass="button-component"
              buttonFunction={handleSubmitReceipts}
              modal={{
                logo: successLogo,
                title: 'Successful!',
                body: 'Your receipts have been successfully uploaded and will be validated within 5 working days.',
                modalButtonText: 'OK',
                modalButtonClass: 'bg-[#02BC7D] hover:bg-green-700',
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Upload;
