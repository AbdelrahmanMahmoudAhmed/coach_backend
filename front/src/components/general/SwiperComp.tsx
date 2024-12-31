"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { useLocale } from "next-intl";
import toContact from "@/utils/ScrollToContact.utils";
import { useTranslations } from "next-intl";
//images
import Image from "next/image";
import Person from "@/public/assets/imgs/home/person.png";
import Quote from "@/public/assets/imgs/home/quote.png";
import Right from "@/public/assets/imgs/home/right.png";
import Left from "@/public/assets/imgs/home/left.png";

const MySwiper = () => {
  const t = useTranslations();

  const locale = useLocale();

  const [key, setKey] = useState(0);
  const carouselArr = [
    {
      id: 1,
      img: Person,
      name: "Abdelrahman Mahmoud",
      title: "BFF Client",
      feedback:
        "I was thoroughly impressed with the app development service. The team delivered a high-quality, user-friendly app that exceeded my expectations.",
    },
    {
      id: 2,
      img: Person,
      name: "Ahmed Hamada",
      title: "Cezma Client",
      feedback:
        "I was thoroughly impressed with the app development service. The team delivered a high-quality, user-friendly app that exceeded my expectations.",
    },
    {
      id: 3,
      img: Person,
      name: "Sayed Ragab",
      title: "Koora Goal client",
      feedback:
        "I was thoroughly impressed with the app development service. The team delivered a high-quality, user-friendly app that exceeded my expectations.",
    },
  ];

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [locale]);

  const toRight = (): void => {
    // Query the button with a specific class
    const rightBtn = document.querySelector<HTMLButtonElement>('.custom-next-button');
    
    // Check if the button exists
    if (rightBtn) {
      rightBtn.click();
    } else {
      console.error("Button not found. Ensure it has the class 'custom-next-button'.");
    }
  };
  const toLeft = (): void => {
    // Query the button with a specific class
    const rightBtn = document.querySelector<HTMLButtonElement>('.custom-prev-button');
    
    // Check if the button exists
    if (rightBtn) {
      rightBtn.click();
    } else {
      console.error("Button not found. Ensure it has the class 'custom-prev-button'.");
    }
  };

  return (
    <div className="swiper-container">
      <Swiper
        key={key}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={500}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        fadeEffect={{
          crossFade: true,
        }}
        navigation={{
          nextEl: ".custom-next-button",
          prevEl: ".custom-prev-button",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
      >
        {carouselArr.map((item) => (
          <SwiperSlide key={item.id}>
      
            <div className="flex justify-center items-center gap-8">
              <div className=" hidden lg:block">
                <Image
                  className=" block mx-auto mt-4"
                  src={Quote}
                  width={100}
                  height={100}
                  alt="quote"
                />
              </div>
              <div className="">
                <div>
                  <Image
                    className=" block mx-auto mt-4"
                    src={item.img}
                    width={70}
                    height={70}
                    alt="client-image"
                  />
                </div>

                <h6 className=" text-center mt-2 mb-1 ">{item.name}</h6>
                <p className="text-center text-[14px] text-fourth dark:text-third ">
                  {item.title}
                </p>
                <p className=" leading-[22.4px] max-w-[600px] mx-auto text-center my-6 text-[14px] sm:text-[16px] ">
                  {item.feedback}
                </p>
                <div className=" flex justify-center cursor-pointer mt-8 gap-6 2xl:mt-10 " >
               
                <button onClick={toLeft} className=" flex items-center justify-center rounded-full w-[40px] h-[40px] bg-primary">
                <Image
                  className=""
                  src={Left}
                  width={24}
                  height={24}
                  alt="left"
                />
                </button>
                <button onClick={toRight} className=" flex items-center justify-center rounded-full w-[40px] h-[40px] bg-primary">
                <Image
                  className=" "
                  src={Right}
                  width={24}
                  height={24}
                  alt="right"
                />
                </button>
       
                </div>
              </div>
              <div  className=" hidden lg:block">
                <Image
                
                  className=" block mx-auto mt-4"
                  src={Quote}
                  width={100}
                  height={100}
                  alt="quote"
                />
              </div>

     
            </div>
            <button className="custom-next-button relative -z-30 opacity-0 "  ></button>
            <button className="custom-prev-button relative -z-30 opacity-0 "  ></button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* <div className="custom-prev-button">Prev</div>
      <div className="custom-next-button">Next</div> */}

      {/* Custom Pagination Bullets */}
      {/* <div className="custom-pagination"></div> */}
    </div>
  );
};

export default MySwiper;
