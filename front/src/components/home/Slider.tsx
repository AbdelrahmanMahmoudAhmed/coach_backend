import React from "react";
import SwiperComp from "@/components/general/SwiperComp";
import { useTranslations } from "next-intl";
import Image from "next/image";

function Slider() {
  const t = useTranslations("home.feedback");

  return (
    <section className=" bg-[#FF6B000D] dark:bg-[#1C1C1C] pt-14 pb-8 my-28  ">
      <div className="app-container">
        <div className=" text-center">
          <span className=" text-[16px] text-primary mb-[10px] block ">
            {t("title")}
          </span>
          <Image
            className="mb-[10px] mx-auto block"
            src={`/assets/imgs/home/feedback.png`}
            width={144}
            height={40}
            alt="feedback"
          />
          <h3 className=" font-[700] leading-[50px] my-1 text-[32px] md:text-[40px]">
            {t("heading")}
          </h3>
          <p className=" text-[14px] sm:text-[16px] text-fourth dark:text-third  ">
            {t("p")}
          </p>
        </div>

        <SwiperComp />
      </div>
    </section>
  );
}

export default Slider;
