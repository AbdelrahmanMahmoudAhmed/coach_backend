"use client";
import React, { useEffect, useState, useRef } from "react";
import ChangeLang from "./ChangeLang";
import ChangeTheme from "./ChangeTheme";
import { useTranslations } from "next-intl";
import { useTheme } from '@/hooks/useThemeHook';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Button from "@/components/general/Button";
import Image from "next/image";
import { destinations } from "@/utils/constants";


function Header() {
  const t = useTranslations();
  const theme = useTheme();
  const pathName = usePathname()
  const [scrolled, setScrolled] = useState(false);
  const [isPopup, setIsPopup] = useState(false);




  const sections = useRef({
    home: destinations.home,
    services: destinations.services,
    about: destinations.about,
    // contact: "#contact",
  });

  const handleScroll = () => {
    const offset = window.scrollY + 340;

    setScrolled(offset > 390);
  };

  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`app-container shadow-md fixed top-0 left-0 w-full z-50 min-h-[--header-height] flex items-center gap-x-8 gap-y-3 py-4 justify-between flex-wrap font-[600] ${
        scrolled ? "header-bg" : "app-bg"
      }`}
    >
      <div className={` ${isPopup ? 'opacity-100 z-[100] block' : 'opacity-0 -z-10 hidden'} app-container pt-4 fixed top-0 left-0 w-[100vw] h-[100vh] app-bg transition-all duration-500 lg:hidden `}>
        <div className=" flex justify-between mb-[60px]">

        <Image 
          src={`/assets/imgs/${theme == 'dark' ? 'dark-logo' : 'logo'}.png`}
          alt="logo" 
          width={104}    
          height={64}         
        />

    <div         
          onClick={()=>setIsPopup(false)} className=" flex items-center justify-center cursor-pointer w-[50px]" >
    <Image 

          src={`/assets/imgs/icons/${theme == 'dark' ? 'Close' : 'Close-light'}.png`}
          alt="close-image" 
          width={24}    
          height={24}         
        />
    </div>
        </div>
        <ul className=" flex flex-col gap-[20px]">
          {Object.entries(sections.current).map(([key, href]) => (
            <li key={key}>
              <Link
                href={href}
                onClick={()=>setIsPopup(false)}
                className={`${pathName === href ? "text-primary" : ""} transition-all duration-100`}
              >
                {t(`header.${key}`)}
              </Link>
            </li>
          ))}
          <li>
          <ChangeLang />
          </li>
        </ul>

        <div className=" mt-[35px]">
          <Button text={t('global.call_to_action')} location={destinations.contact}/>
        </div>
      </div>
      <Link href="/" className=" text-[1.8rem] font-[700] ">

          <Image 
          src={`/assets/imgs/${theme == 'dark' ? 'dark-logo' : 'logo'}.png`}
          alt="logo" 
          width={104}    
          height={64}         
        />
      </Link>
      <nav className=" items-center justify-center font-bold flex-1 hidden text-sm lg:flex md:text-lg lg:ms-[100px] xl:ms-[200px]">
        <ul className="w-full flex justify-between sm:justify-center lg:gap-6 xl:gap-14">
          {Object.entries(sections.current).map(([key, href]) => (
            <li key={key}>
              <Link
                href={href}
             
                className={`${pathName === href ? "text-primary" : ""} transition-all duration-100`}
              >
                {t(`header.${key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-3 items-center">
        <ChangeTheme />
        <Image 
        onClick={()=>setIsPopup(true)}
        className=" cursor-pointer lg:hidden"
                src={`/assets/imgs/icons/${theme == 'dark' ? 'burger-menu' : 'burger-menu-light'}.png`}
                alt="logo" 
                width={40}    
                height={40}         
              />
        <span className="w-[1px] bg-[#565656] h-[20px] hidden lg:block "></span>
        <div className=" hidden lg:block">
        <ChangeLang />
        </div>
      </div>
      <div className=" hidden lg:block">
      <Button text={t('global.call_to_action')} location={destinations.contact}/>
      </div>
 
    </header>
  );
}

export default Header;





