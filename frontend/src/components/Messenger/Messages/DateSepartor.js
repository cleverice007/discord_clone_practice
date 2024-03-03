import React from "react";

const DateSeparator = ({ date }) => {
  return (
    <div className="w-95% bg-[#b9bbbe] h-px relative my-5 mt-5 mb-2.5">
      <span className="absolute left-1/2 top-[-10px] bg-[#36393f] text-[#b9bbbe] px-1 py-0.5 text-sm" style={{ transform: 'translateX(-50%)' }}>
        {date}
      </span>
    </div>
  );
};

export default DateSeparator;
