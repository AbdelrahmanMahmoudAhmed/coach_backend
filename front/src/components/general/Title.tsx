import React from "react";
import { useTranslations } from "next-intl";

interface TitleProps {

  section:string;

}

const Title: React.FC<TitleProps> = ({section}) => {
  const t = useTranslations(`titles.${section}`)

  return (
<div>
  <div className="flex items-center gap-2 mb-6 ">
    <span className=" block w-[50px] h-[1px] bg-gradient-to-r from-[#FF3F00] to-[#FF8100] "></span>
    <span className=" text-[16px] text-primary" >{t('sectionName')}</span>
  </div>
  <div className="text-[32px] font-[700] leading-[30px] md:text-[40px]">{t('heading')}</div>

</div>
  );
};

export default Title;
