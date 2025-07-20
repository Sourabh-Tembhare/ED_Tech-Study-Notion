import React, { useEffect, useState } from 'react';
import { SlCloudUpload } from "react-icons/sl";

const MediaPicker = ({ labelName, setFile, imageUrl }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState("");

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileUrl(URL.createObjectURL(file));
      setFileType(file.type); // e.g., "image/jpeg" or "video/mp4"
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setFileUrl(imageUrl);
      // Optional: You can try to guess file type from URL extension
      const extension = imageUrl.split('.').pop().toLowerCase();
      if (["mp4", "webm", "ogg"].includes(extension)) {
        setFileType("video");
      } else {
        setFileType("image");
      }
    }
  }, [imageUrl]);

  return (
    <>
      <label className='w-full flex flex-col gap-1 relative'>
        <p>
          {labelName} <sup className="text-pink-400">*</sup>
        </p>
        <div className="bg-richblack-700 rounded-md w-full border border-dashed border-richblack-600 cursor-pointer">
          <div className='mx-auto py-8 flex items-center justify-center flex-col gap-4'>
            <div className='h-10 w-10 bg-richblack-900 flex items-center justify-center rounded-full'>
              <SlCloudUpload size={20} className='text-yellow-50 font-semibold' />
            </div>
            <p className='text-pure-greys-200 text-center'>
              Drag and drop an image or video, or <span className='text-yellow-50'>Browse</span><br />
              Max 6MB each (12MB for videos)
            </p>
            <ul className='list-disc text-pure-greys-400 flex lg:gap-6 ml-5 lg:flex-row flex-col gap-1'>
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024×576</li>
            </ul>
          </div>
        </div>

        <div className='absolute top-8 left-28'>
          {fileUrl && (
            fileType.startsWith("video") ? (
              <video src={fileUrl} controls className='w-[100%] h-48 rounded-md' />
            ) : (
              <img src={fileUrl} alt="selectedFile" className='w-[100%] h-48 rounded-md' loading='lazy' />
            )
          )}
        </div>

        <input type="file" accept="image/*,video/*" className='hidden' onChange={fileHandler} />
      </label>
    </>
  );
};

export default MediaPicker;
