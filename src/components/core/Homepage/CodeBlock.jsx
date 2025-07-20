import React from 'react';
import HighlighContent from './HighlighContent';
import UniversalButton from './UniversalButton';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({
  heading,
  subHeading,
  UniversalButton1,
  CodeBlockContent,
  position,
  UniversalButton2
}) => {
  return (
    <div className={`flex flex-col ${position} justify-center items-center gap-8 w-full`}>
      
      {/* LEFT SECTION */}
      <div className='flex flex-col gap-4 lg:w-[50%] w-[100%] lg:p-0 p-4 min-w-[300px]'>
        {/* Heading */}
        <div className='text-4xl text-white'>
          <div className='flex gap-2 flex-wrap'>
            <p>{heading.firstPart}</p>
            <HighlighContent text={heading.highlighttext} />
          </div>
          <p>{heading.lastPart}</p>
        </div>

        {/* Subheading */}
        <div className='mt-4'>
          <p className='text-richblack-400'>{subHeading}</p>
        </div>

        {/* Buttons */}
        <div className='flex gap-5 mt-8 flex-wrap'>
          <UniversalButton active={UniversalButton1.active} to={UniversalButton1.to}>
            <div className='flex items-center gap-3'>
              {UniversalButton1.children}
              <FaArrowRight />
            </div>
          </UniversalButton>

          <UniversalButton active={false} to={UniversalButton2.to}>
            {UniversalButton2.children}
          </UniversalButton>
        </div>
      </div>

      {/* RIGHT SECTION (Code Display) */}
      <div className='flex flex-row lg:w-[50%] w-[100%] min-w-[300px] bg-richblack-800 lg:p-8   rounded-lg shadow-md'>
        <div className='text-richblack-300 w-[10%] text-right pr-2 md:-ml-12 sm:-ml-6'>
          {Array.from({ length: 14 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
        <div className='text-yellow-100 w-[90%] pl-2 -ml-2'>
          <div className='min-h-[300px]'>
            <TypeAnimation
              sequence={[CodeBlockContent, 3000, ""]}
              repeat={Infinity}
              style={{
                whiteSpace: "pre-line",
                display: "block"
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default CodeBlock;
