import React from "react";
import Video from "../general/Video";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { destinations } from "../../utils/constants";
import Button from "../general/Button";
function FirstSection() {
  const t = useTranslations();

  return (
    <section  className=" relative overflow-hidden">
      <Video
        style={{ height: "calc(100vh - 95.38px)", width: "100%" }}
        video="first"
      />
      <div className=" absolute top-0 left-0 h-full w-full bg-[#000000b6] flex items-center justify-center text-white">
        <div className=" max-w-[744px]">
          <div className="flex items-center gap-2 text-[14px] w-fit mx-auto mb-[16px]  border border-[#DDDDDD] rounded-[36px] px-4 py-[1px] dark:border-[#565656] ">
            <Image
              className=" rounded-md max-w-[100%] block mx-auto  "
              width={20}
              height={35.48}
              src={`/assets/imgs/home/hmaserv.png`}
              alt="hmaserv"
            />
            <span>{t("home.first.slogan")}</span>
          </div>
          <div className=" text-center font-[700] mb-[16px] text-[24px] sm:text-[32px] md:text-[42px] lg:text-[60px]">
            <p>
              {t("home.first.welcome.syllable_one")}{" "}
              <span className="text-primary">Hmaserv</span>{" "}
            </p>
            <p>{t("home.first.welcome.syllable_two")}</p>
          </div>
          <p className="leading-custom max-w-[680px] mx-auto px-8 text-[14px] text-center md:text-[16px]">
            We are a multinational company, founded in 2013. We are one of the
            leading companies in web hosting, web development, app development,
            and embedded systems industries.
          </p>
          <div className="flex justify-center mt-[40px] md:mt-[32px] ">
            <Button text={t('header.contact')} location={destinations.contact} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FirstSection;
