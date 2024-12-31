import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';

const reasons = [
    {title_en:"Save time and cost" , title_ar:"توفير الوقت والتكلفة" , content_en:"Hmaserv can build your development team kick-start your project and save you the time and cost of building an in-house development team." , content_ar:"يمكن لـ Hmaserv بناء فريق التطوير الخاص بك وبدء مشروعك وتوفير الوقت والتكلفة اللازمة لبناء فريق تطوير داخلي."},
    {title_en:"Flexible and scalable" , title_ar:"مرونة و قابلية للتطوير" , content_en:"Whether developing an MVP or a full complete software solution, Hmaserv teams are flexible, scalable, and adaptive to your project needs." , content_ar:"سواء كنت تقوم بتطوير MVP أو حل برمجي كامل، فإن فرق Hmaserv مرنة وقابلة للتطوير وقادرة على التكيف مع احتياجات مشروعك."},
    {title_en:"Top technical expertise" , title_ar:"خبرة فنية عالية" , content_en:"Our candidates go through an extensive and careful testing process to join Hmaserv, so we can ensure top-quality output is delivered to our clients." , content_ar:"يخضع موظفونا لعملية اختبار مكثفة ودقيقة للانضمام إلى Hmaserv، حتى نتمكن من ضمان تقديم خدمة عالية الجودة لعملائنا."},
]

function WhyUs() {
    const locale = useLocale();

    const t = useTranslations('home.why_us');
  return (
    <section className="app-container bg-[#1C1C1C] text-white py-[40px]">

        <div className="max-w-[650px] mx-auto mb-[50px]">
            <h3 className="text-[32px] lg:text-[42px] text-center font-[700] mb-2 " >{t('title')}</h3>
            <p className="text-center leading-custom" >{ t('p') }</p>
        </div>


        <div className="flex flex-col justify-center gap-4 items-center md:items-start md:flex-row">
          {
            reasons.map((item , idx)=>(
                <>
                <div className="md:max-w-[200px] xl:max-w-[320px]" key={idx} >
                    <div className="">
                        <Image 
                        className={ `  mx-auto mb-4`}
                            width={100}
                            height={100}
                                src={`/assets/imgs/home/num_${idx + 1}.png`}
                                alt="about-us" 
                        />
                    </div>
                    <h5 className="text-[24px] font-[500] text-center leading-[28px] mb-2 " >{locale == 'ar' ? item.title_ar : item.title_en}</h5>
                    <p className="text-[14px] text-third text-center">{locale == 'ar' ? item.content_ar : item.content_en}</p>
                </div>
                {(idx == 0 || idx == 1)&& ( 
                     <div className="w-[80px]">
                        <Image 
                        className={` ${locale == 'ar' && 'rotate-180'} hidden md:block `}
                        width={80}
                        height={80}
                            src={`/assets/imgs/home/arrow_${idx + 1}.png`}
                            alt="arrow" 
                    />
                             <Image 
                        className={` ${locale == 'ar' && 'rotate-180'} block md:hidden`}
                        width={80}
                        height={80}
                            src={`/assets/imgs/home/arrow_mob_${idx + 1}.png`}
                            alt="arrow" 
                    />
                     </div>
                    ) 
                        }
                </>
            ))
          }
        </div>

    </section>
  )
}

export default WhyUs