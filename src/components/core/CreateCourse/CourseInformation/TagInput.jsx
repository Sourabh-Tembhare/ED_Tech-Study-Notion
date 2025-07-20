import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ' || e.key === ',') && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      <label className="text-sm text-richblack-5 font-medium">
        Tags <span className="text-pink-200">*</span>
      </label>

      {/* Tags above input */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-richblack-700 text-white px-2 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press space"
       className="bg-richblack-700 rounded-md w-full p-2 border-b-[1px]  outline-none"
      />
    </div>
  );
};

export default TagInput;
