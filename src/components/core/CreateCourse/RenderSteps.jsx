import React from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Course Information",
  },
  {
    id: 2,
    title: "Course Builder",
  },
  {
    id: 3,
    title: "Publish",
  },
];

const RenderSteps = () => {
  const stepNumber = useSelector((state) => state.course.step);
  return (
    <div className="md:flex w-[80%] hidden ">
      {steps.map((step) => {
        return (
          <div className="flex flex-col gap-2" key={step.id}>
            <div className="flex items-center justify-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full
                 bg-richblack-700 border
                  border-richblack-700 ${
                    stepNumber === step.id
                      ? "border-yellow-50 bg-transparent"
                      : ""
                  }`}
              >
                {step.id < stepNumber ? (
                  <FaCheckCircle className="w-full text-yellow-50" />
                ) : (
                  <p className="text-white text-sm">{step.id}</p>
                )}
              </div>

              {step.id < steps.length && (
                <div
                  className={`border border-dashed w-56 border-richblack-700 ${
                    step.id < stepNumber ? "border-yellow-50" : ""
                  }`}
                ></div>
              )}
            </div>
            <p
              className={` font-semibold   text-xs ${
                step.id === 1 ? "-ml-8" : ""
              }   ${step.id === 2 ? "-ml-8" : ""}`}
            >
              {step.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RenderSteps;
