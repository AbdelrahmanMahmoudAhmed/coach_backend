import React from "react";
import Title from "@/components/general/Title";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import useDateAndNums from "@/utils/datesAndNums";
import TimeLine from "@/components/about/TimeLine";
import LetsTalk from "@/components/general/LetsTalk";
import PageTitle from "@/components/general/PageTitle";

function About() {
  const locale = useLocale();
  const { useNums } = useDateAndNums();

  const t = useTranslations();
  const quote = `Our company has a great history and an outstanding team with
            experience in delivering exceptional projects for prestigious
            clients.`
  return (
    <main className="app-container ">
      <section className="mb-[60px]">
        <PageTitle title={t("about.title")} quote={quote}/>
     

        <div className="w-full h-[348px] mt-[40px]">
          <img
            className=" object-cover h-full w-full rounded-[8px]"
            src="/assets/imgs/about/banner.png"
            alt="about-us"
          />
        </div>
      </section>
      <section className="mb-[60px]">
        <div className="lg:max-w-[85%] lg:me-auto">
          <div className="mb-4">
            <Title section="about" />
          </div>
          <p className="general-p ">
            We are a multi-national company, founded  in 2013. We are one of the
            leading companies in the webhosting, web development, app
            development, automation, and embedded systems industries. We have
            served over 5,000 high end clients from all over the world, helping
            their businesses bloom and their projects thrive
          </p>
        </div>

        <div className="mt-[40px] flex flex-col gap-x-[60px] gap-y-[40px] xl:flex-row">
          <div className="w-full xl:w-[75%] flex-2">
            <h3 className="flex items-center text-[32px] font-[700] gap-2 mb-5 ">
              <Image
                width={50}
                height={50}
                src="/assets/imgs/about/star.png"
                alt="heading-sign"
              />

              <span>{t("about.vision")}</span>
            </h3>
            <p className="general-p">
              We believe that the future lies in the formation of technology in
              all spheres of life and believe that this will happen sooner or
              later,so as a HMAS company, we cope up with the technology steps
              in more than one field to serve our customers. Our motto is not
              only to create a project, business or provide a service to the
              customer,but to achieve the success that the customer hopes for
              .and this is the reason behind of our diversity of services as
              this allows us to be able to give an extra edge to our customers
              over their competitors. we also seek to expand and reach with our
              services to more numbers and more countries as we have done before
              providing our services to
              France,Germany,India,Philippines,Egyptsnip,Brazil and Morocco
            </p>
          </div>
          <div className=" flex-1">
            <h3 className="flex items-center text-[32px] font-[700] gap-2 mb-5 ">
              <Image
                width={50}
                height={50}
                src="/assets/imgs/about/star.png"
                alt="heading-sign"
              />

              <span>{t("about.mission")}</span>
            </h3>
            <p className="general-p">
              to provide more services and reach more countries around the world
              by reaching the upmost customer satisfaction and always
              maintaining our excellence in our field.
            </p>
          </div>
        </div>
      </section>
      <section className=" relative bg-gradient-to-r from-[#FF3F00] to-[#F8C827] rounded-[20px] overflow-hidden md:h-[246px] ">
        <div className=" absolute z-10 top-0 left-0 h-full w-full flex flex-col justify-between md:flex-row">
        <img
                className=""
                src="/assets/imgs/about/one.png"
                alt="heading-sign"
              />
                    <img
             className=""
                src="/assets/imgs/about/two.png"
                alt="heading-sign"
              />
        </div>
        <div className=" relative z-20 flex flex-col justify-center items-center w-full h-full gap-x-[50px] gap-y-[100px] px-2 py-[100px] md:flex-row md:py-8 ">
        <div className="flex flex-col text-white items-center justify-center ">
                <span className="text-[40px] font-[700] text-center ">{useNums(locale ,  12)}+</span>
                <span className="text-[24px] text-center font-[600] ">{t('global.years_experience')}</span>
            </div>
            <div className="flex flex-col text-white items-center justify-center">
                <span className="text-[40px] font-[700] text-center ">{useNums(locale ,  5000)}+</span>
                <span className="text-[24px] text-center font-[600] ">{t('global.satisfied_clients')}</span>
            </div>
            <div className="flex flex-col text-white items-center justify-center">
                <span className="text-[40px] font-[700] text-center ">{useNums(locale ,  60)}+</span>
                <span className="text-[24px] text-center font-[600] ">{t('global.delivered_projects')}</span>
            </div>
            <div className="flex flex-col text-white items-center justify-center">
                <span className="text-[40px] font-[700] text-center ">{useNums(locale ,  4.5)}+</span>
                <span className="text-[24px] text-center font-[600] ">{t('global.client_rating')}</span>
            </div>
        </div>
      </section>
      <section className=" pt-[60px] flex flex-col gap-x-[20px] gap-y-[24px] lg:flex-row lg:justify-between lg:items-center xl:gap-[100px]">
      <div className="xl:max-w-[650px]">
        <div>
          <Title section="environment" />
        </div>
        <p className="text-[#79767D] leading-custom mt-[24px]">
        Our company is committed to creating a positive and enjoyable work environment for all employees. We believe in balancing work and relaxation, which is why we provide recreational facilities such as a PlayStation, a dedicated gaming room, and organize company trips. These activities help our team unwind, foster creativity, and build stronger bonds among colleagues.
        </p>
   
  
      </div>
    <div className=" mt-[30px] h-fit flex flex-wrap gap-[8px] 2xl:gap-[16px] sm:justify-between lg:max-w-[600px]">
  
    {Array.from({ length: 4 }).map((_, index) => (
        <img    className="w-[48%] sm:w-[23.5%] lg:w-[48%] "  src={`/assets/imgs/home/about_${index + 1}.png`}
        alt="about-us" 
      />))}
   
    </div>

    </section>
    
    <TimeLine />

    <LetsTalk />

    </main>
  );
}

export default About;
