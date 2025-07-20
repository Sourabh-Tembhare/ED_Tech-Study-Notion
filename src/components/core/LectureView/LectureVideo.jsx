import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { CgPlayButtonO } from "react-icons/cg";
import { FaArrowRight, FaArrowLeft, FaRedoAlt } from "react-icons/fa";

const LectureVideo = () => {
  const location = useLocation();
  const params = useParams();
  const { courseAllData, courseSectionData } = useSelector((state) => state.lecture);
  const [sectionId, setSectionId] = useState("");
  const [subSectionId, setSubSectionId] = useState("");
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoUrl, SetVideoUrl] = useState("");
  const playerRef = useRef();
  const [SSubsectionDetails, setSubSectionDeatails] = useState({});

  useEffect(() => {
    
    const sectionIdP = params.sectionId;
    const subSectionIdP = params.subSectionId;
    setSectionId(sectionIdP);
    setSubSectionId(subSectionIdP);

    if (courseSectionData && Array.isArray(courseSectionData)) {
      const sectionDetails = courseSectionData.find((section) => section._id === sectionIdP);
      if (sectionDetails?.subSection?.length > 0) {
        const subSectionDetails = sectionDetails.subSection.find(
          (lecture) => lecture._id === subSectionIdP
        );
        if (subSectionDetails) {
          SetVideoUrl(subSectionDetails.videoUrl);
          setSubSectionDeatails(subSectionDetails);
        }
      }
    }
  }, [location.pathname, courseSectionData]);
const isFirstVideo = () => {
  if (
    !courseSectionData ||
    !Array.isArray(courseSectionData) ||
    courseSectionData.length === 0 ||
    !courseSectionData[0].subSection ||
    courseSectionData[0].subSection.length === 0
  ) {
    return false;
  }

  return courseSectionData[0].subSection[0]._id === subSectionId;
};

const isLastVideo = () => {
  if (
    !courseSectionData ||
    !Array.isArray(courseSectionData) ||
    courseSectionData.length === 0
  ) {
    return false;
  }

  const lastSection = courseSectionData[courseSectionData.length - 1];
  if (!lastSection.subSection || lastSection.subSection.length === 0) {
    return false;
  }

  const lastVideo = lastSection.subSection[lastSection.subSection.length - 1];
  return lastVideo._id === subSectionId;
};


  const nextbuttonHandler = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    );

    if (currentSubSectionIndex < courseSectionData[currentSectionIndex].subSection.length - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/courseView/course/${courseAllData._id}/section/${sectionId}/subsection/${nextSubSectionId}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/courseView/course/${courseAllData._id}/section/${nextSectionId}/subsection/${nextSubSectionId}`);
    }
  };

  const preivousButtonHandler = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    );

    if (currentSubSectionIndex > 0) {
      const previousSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/courseView/course/${courseAllData._id}/section/${sectionId}/subsection/${previousSubSectionId}`);
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSection = courseSectionData[currentSectionIndex - 1].subSection;
      const prevSubSectionId = prevSubSection[prevSubSection.length - 1]._id;
      navigate(`/courseView/course/${courseAllData._id}/section/${prevSectionId}/subsection/${prevSubSectionId}`);
    }
  };



  return (
    <div className="p-6 md:p-10 text-richblack-5">
      {videoUrl === "" ? (
        <div className="text-center text-lg font-semibold text-richblack-300">No Data Found</div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden shadow-lg border border-richblack-700">
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoUrl}
            />
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h2 className="lg:text-2xl font-bold text-yellow-50">{SSubsectionDetails?.title}</h2>
            <p className="text-richblack-200 text-sm">{SSubsectionDetails?.description}</p>
          </div>

          {/* Controls after video ends */}
          {videoEnded && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 p-4 border border-richblack-700 bg-richblack-800 rounded-md transition-all duration-300">
              <button
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-yellow-50 text-richblack-900 hover:bg-yellow-100 transition-all"
              >
                <FaRedoAlt /> Rewatch
              </button>

              <div className="flex items-center gap-3">
                {!isFirstVideo() && (
                  <button
                    onClick={preivousButtonHandler}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-richblack-700 hover:bg-richblack-600 transition"
                  >
                    <FaArrowLeft /> Previous
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    onClick={nextbuttonHandler}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-yellow-50 text-richblack-900 hover:bg-yellow-100 transition"
                  >
                    Next <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LectureVideo;
