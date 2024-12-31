import React from "react";
import Title from "../general/Title";
import Image from "next/image";
import Button from "../general/Button";
import { destinations } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import useDateAndNums from "@/utils/datesAndNums";

function AboutUs() {
    const locale = useLocale();
    const { useNums } = useDateAndNums()

    const t = useTranslations('global');
    const sections = [{name_en :"Web Development" , name_ar:"تطوير الويب"} ,{ name_en:"Mobile App Development " , name_ar:"تطوير تطبيقات الهاتف المحمول"} , {name_en:"Web hosting" , name_ar:"استضافة الويب"} , {name_en:"ERP System" , name_ar:"نظام تخطيط موارد المؤسسات"} ]

  return (
    <section className="app-container py-[70px] flex flex-col gap-x-[20px] gap-y-[24px] lg:flex-row lg:justify-between xl:gap-[100px]">
      <div className="xl:max-w-[650px]">
        <div>
          <Title section="about" />
        </div>
        <p className="text-[#79767D] leading-custom mt-[24px]">We are a multinational company, founded in 2013. We are one of the leading companies in web hosting, web development, app development, and embedded systems industries, We offer a wide range of services, such as:</p>
      <div className=" mt-[20px] flex flex-col gap-y-[20px] sm:flex-row sm:justify-between sm:flex-wrap ">

        {
            sections.map((item , idx)=>(
                <div className=" w-full flex items-center gap-2 sm:w-[48%]" key={idx}>
                <Image 
               width={20}
               height={20}
                     src={`/assets/imgs/icons/Check.png`}
                     alt="about-us" 
                   />
                   <div>
                    { locale == 'ar' ? item.name_ar : item.name_en }
                   </div>
                </div>
            ))
        }
    
      </div>
        <div className="mt-[40px]">
        <Button text={t('read_more')} location={destinations.about}  withArrow={true} />
        </div>

        <div className="flex items-center gap-2 mt-[30px] md:gap-4 xl:gap-6">
            <div className="flex flex-col ">
                <span className="text-[24px] md:text-[32px] font-[700] ">{useNums(locale ,  12)}+</span>
                <span className="text-[12px] md:text-[16px] ">{t('years_experience')}</span>
            </div>
            <div className="w-[1px] bg-[#DDDDDD] dark:bg-[#565656] h-[70px] mx-2"></div>
            <div className="flex flex-col  ">
                <span className="text-[24px] md:text-[32px] font-[700] ">{useNums(locale ,  5000)}+</span>
                <span className="text-[12px] md:text-[16px] ">{t('satisfied_clients')}</span>
            </div>
            <div className="w-[1px] bg-[#DDDDDD] dark:bg-[#565656] h-[70px] mx-2"></div>
            <div className="flex flex-col">
                <span className="text-[24px] md:text-[32px] font-[700] ">{useNums(locale ,  60)}+</span>
                <span className="text-[12px] md:text-[16px] ">{t('delivered_projects')}</span>
            </div>
        </div>
      </div>
    <div className=" mt-[30px] h-fit flex flex-wrap gap-[8px] 2xl:gap-[16px] sm:justify-between lg:max-w-[600px]">
  
    {Array.from({ length: 4 }).map((_, index) => (
        <img    className="w-[48%] sm:w-[23.5%] lg:w-[48%] "  src={`/assets/imgs/home/about_${index + 1}.png`}
        alt="about-us" 
      />))}
   
    </div>

    </section>
  );
}

export default AboutUs;
