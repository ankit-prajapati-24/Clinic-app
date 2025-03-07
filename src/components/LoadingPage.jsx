import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-sky-200 to-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
    </div>
  );
};

export default LoadingPage;