import React from 'react';

const inputWithLabel = ({ value, setValue, label, type, placeholder }) => {
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-gray-400 uppercase font-semibold text-sm mb-2">
        {label}
      </p>
      <input
        className="flex-grow h-10 border border-black rounded text-gray-300 bg-gray-900 p-2"
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default inputWithLabel;
