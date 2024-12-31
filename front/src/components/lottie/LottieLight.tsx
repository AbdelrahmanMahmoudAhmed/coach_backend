import React from "react";
import Lottie from "lottie-react";
// import animationData from "@/json/lottie-light.json";
import animationData from "@/json/data-ligth.json";

const LottieLight = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieLight;
