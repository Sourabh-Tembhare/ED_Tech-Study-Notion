import React, { useState } from 'react'

const RequirementCollector = ({requirementArray,setRequirementArray}) => {
    const [requirement,setRequirements] = useState('');

    const addHandler = () => {
   if (requirement.trim() !== "") {
    setRequirementArray([...requirementArray, requirement]);
    setRequirements("");
   }
};

    const removeHandler = (requirementName)=>{
      setRequirementArray(requirementArray.filter((data) => data !== requirementName))
    }
  return (
<div>
         <label className="flex flex-col gap-1">
          <p>
            Requirements/Instructions <sup className="text-pink-400">*</sup>
          </p>
          <input
            type="text"
            value={requirement}
            onChange={(e) => setRequirements(e.target.value)}
            className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px]  outline-none"
            placeholder="Enter Course Title"
          />
        </label>
   <div className='flex flex-col gap-2 mt-2'>
         {
            requirementArray.length > 0 && (requirementArray.map((data,index) => {
                return <div className='flex justify-between border-b-2 border-richblack-600' key={index}>
                    <p>{data}</p>
                    <div className='text-pink-400 cursor-pointer font-semibold' onClick={()=> removeHandler(data)}>Clear</div>
                </div>
            }))
        }
   </div>
        <div className='text-yellow-50 font-semibold mt-2 cursor-pointer'onClick={addHandler}>Add</div>
</div>
  )
}

export default RequirementCollector