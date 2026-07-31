import React from "react";

const Loader = ({ size = 70 }) => {
  return (
    <div className="min-h-screen border flex items-center justify-center">
      <div
        className="relative animate-spin"
        style={{ width: size, height: size }}
      >
        {/* Gradient ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #FA9E05, #A7095C, #D6E752, #FA9E05)",
          }}
        />

        {/* Hollow center */}
        <div className="absolute inset-[4px] rounded-full bg-white" />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#35552B]" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
