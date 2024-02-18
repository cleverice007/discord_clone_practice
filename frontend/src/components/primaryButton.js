import React from 'react';

const PrimaryButton = ({ label, additionalStyles, disabled, onClick }) => {
  return (
    <button
      className={`text-white bg-blue-600 hover:bg-blue-700 font-medium text-base px-4 py-2 rounded transition duration-150 ease-in-out ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${additionalStyles}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
