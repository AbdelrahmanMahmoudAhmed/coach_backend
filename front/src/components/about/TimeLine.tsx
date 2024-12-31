import React from "react";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';

function TimeLine() {

  const locale = useLocale();

  const achievements = [
    {
      year: 2020,
      color: "#FF6B00",
      text: "We Believe That The Future Lies In The Formation Of Technology In All Spheres Of Life And Believe That This Will Happen Sooner Or Later, So As A HMAS Company, We Cope Up With The Technology Steps In More Than One Field To Serve Our Customers.",
    },
    {
      year: 2021,
      color: "#F8C827",
      text: "We Believe That The Future Lies In The Formation Of Technology In All Spheres Of Life And Believe That This Will Happen Sooner Or Later, So As A HMAS Company, We Cope Up With The Technology Steps In More Than One Field To Serve Our Customers.",
    },
    {
      year: 2022,
      color: "#FF3F00",
      text: "We Believe That The Future Lies In The Formation Of Technology In All Spheres Of Life And Believe That This Will Happen Sooner Or Later, So As A HMAS Company, We Cope Up With The Technology Steps In More Than One Field To Serve Our Customers.",
    },
    {
      year: 2023,
      color: "#3081AC",
      text: "We Believe That The Future Lies In The Formation Of Technology In All Spheres Of Life And Believe That This Will Happen Sooner Or Later, So As A HMAS Company, We Cope Up With The Technology Steps In More Than One Field To Serve Our Customers.",
    },
    {
      year: 2024,
      color: "#5FB7A1",
      text: "We Believe That The Future Lies In The Formation Of Technology In All Spheres Of Life And Believe That This Will Happen Sooner Or Later, So As A HMAS Company, We Cope Up With The Technology Steps In More Than One Field To Serve Our Customers.",
    },
  ];

  const t = useTranslations();

  return (
    <section className="my-[100px]">
      <h3 className="font-[700] text-[32px] text-center mb-14 lg:text-[40px] ">
        {t("about.achievements")}
      </h3>

      <div className=" hidden md:block">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <div
            style={{
              backgroundImage: `url("/assets/imgs/about/custom_bg.png")`,
            }}
            className=" h-[44px] w-[8px]"
          ></div>

          {achievements.map((item, idx) => (
            <div
              key={idx}
              className=" flex flex-col justify-center items-center gap-2 relative w-full "
            >
              <div
                style={{ width: "calc(50% + 20px)" }}
                className={`relative flex  ${
                  idx % 2 == 0 ? " self-end" : "self-start justify-end"
                }`}
              >
                <div
                  style={{ borderColor: item.color }}
                  className=" rounded-full border-[6px]  w-[40px] h-[40px] relative"
                ></div>
                <div
                  style={{ width: "calc(100% - 50px)" }}
                  className={`absolute h-[130px] top-[-47px] flex items-center 
                    ${locale === "en" ? 
                      (idx % 2 === 0 ? "left-[50px]" : "right-[50px] flex-row-reverse") : 
                      (idx % 2 === 0 ? "right-[50px]" : "left-[50px] flex-row-reverse")
                    }`}
                >
                  <div className="flex items-center">
                    <span
                      style={{ backgroundColor: item.color }}
                      className={`w-[8px] h-[8px] rounded-full `}
                    ></span>
                    <span
                      style={{ backgroundColor: item.color, height: "2px" }}
                      className=" w-[40px] xl:w-[60px] 2xl:w-[117px]"
                    ></span>
                    <span
                      style={{ backgroundColor: item.color }}
                      className={`w-[8px] h-[8px] rounded-full `}
                    ></span>
                  </div>

                  <div className=" flex gap-2 items-center">
                    <div
                      style={{ backgroundColor: item.color }}
                      className=" text-[18px] font-[600] mx-2 h-[70px] w-[70px] rounded-full text-white flex items-center justify-center lg:text-[24px] lg:h-[85px] lg:w-[85px] xl:w-[100px] xl:h-[100px]"
                    >
                      {item.year}
                    </div>
                  </div>
                  <div className=" px-1 text-fourth text-[12px] leading-[15.4px] lg:text-[14px] lg:leading-[18.4px] xl:leading-[22.4px] dark:text-third ">
                    {item.text}
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url("/assets/imgs/about/custom_bg.png")`,
                }}
                className=" h-[44px] w-[8px]"
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden">
        <div
          style={{
            backgroundImage: `url("/assets/imgs/about/custom_bg.png")`,
          }}
          className=" ms-[12px] h-[44px] w-[8px] xs:ms-[16px]"
        ></div>
        {achievements.map((item, idx) => (
          <div key={idx} className={` flex gap-2 `}>
            <div>
              <div
                style={{ borderColor: item.color }}
                className=" rounded-full border-[6px] my-[25px] w-[30px] h-[30px] relative xs:w-[40px] xs:h-[40px] xs:my-[10px]"
              ></div>
              <div
                style={{
                  backgroundImage: `url("/assets/imgs/about/custom_bg_mob.png")`,
                }}
                className={`ms-[12px] h-[176px] w-[8px] xs:ms-[16px] ${
                  idx + 1 == achievements.length && " hidden"
                }`}
              ></div>
                      <div
          style={{
            backgroundImage: `url("/assets/imgs/about/custom_bg.png")`,
          }}
          className={` ${
                  idx + 1 == achievements.length ? "block" :" hidden"
                } ms-[12px] h-[44px] w-[8px] xs:ms-[16px]`}
        ></div>
            </div>
       <div className=" pt-[36px] xs:pt-[26px]">
       <div className="flex items-center">
                    <span
                      style={{ backgroundColor: item.color }}
                      className={`w-[8px] h-[8px] rounded-full `}
                    ></span>
                    <span
                      style={{ backgroundColor: item.color, height: "2px" }}
                      className=" w-[25px] xs:w-[40px] "
                    ></span>
                    <span
                      style={{ backgroundColor: item.color }}
                      className={`w-[8px] h-[8px] rounded-full `}
                    ></span>
                  </div>
       </div>
       <div className=" mt-[5px] xs:mt-[-6px]">
        <div  style={{ backgroundColor: item.color }} className=" w-[70px] h-[70px] rounded-full flex items-center justify-center font-[600] text-[18px] text-white ">
          {item.year}
        </div>
        <div className=" text-fourth text-[12px] leading-[19.2px] pt-2 dark:text-third sm:pt-6 sm:text-[14px] sm:leading-[22.4px] sm:max-w-[350px]">{item.text}</div>
       </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default TimeLine;
