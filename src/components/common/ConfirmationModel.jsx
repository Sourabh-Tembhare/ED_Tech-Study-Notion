import React from 'react';

const ConfirmationModal = ({ isOpen, toggle, title, message, confirmText, cancelText, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-richblack-800 text-white w-[90%] max-w-md rounded-lg shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={toggle} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        {/* Body */}
        <div className="mb-6 text-sm text-richblack-300">
          {message}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4">
          <button onClick={toggle} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
