import React from "react";
import Lottie from "lottie-react";
// import animationData from "@/json/lottie-dark.json";
import animationData from "@/json/data-dark.json";

const LottieDark = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieDark;
