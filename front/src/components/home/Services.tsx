import React from "react";
import Title from "../general/Title";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/utils/constants";
import { useLocale } from "next-intl";

function Services() {
  const t = useTranslations("");
  const locale = useLocale();

  const services = [
    {
      id: 1,
      title: "Webhosting",
      content:
        "provides fully managed servers,server management services and custom solutions to individuals and businesses.",
    },
    {
      id: 2,
      title: "Website & Mobile App Development",
      content:
        "provides web and mobile application development, enterprise product consulting, and software development.",
    },
    {
      id: 3,
      title: "Gaming",
      content:
        "We specialize in providing all types of proxy services at competitive prices, with high quality and fast service delivery.",
    },
    {
      id: 4,
      title: "ERP System",
      content:
        "provides fully managed servers, server management services and custom solutions to individuals and businesses.",
    },
  ];

  return (
    <section className="app-container mt-[100px]">
      <div className="mb-[40px]">
        <Title section="services" />
        <p className=" mt-[16px] text-fourth dark:text-third">
          We provide specialized services tailored to meet your needs with
          excellence
        </p>
      </div>
      <div className=" grid gap-[16px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
        {services.map((service, idx) => (
          <div
            key={idx}
            className=" service-card flex flex-col justify-between p-[24px] rounded-[8px] shadow-3xl cursor-pointer transition-all duration-200 dark:bg-[#1C1C1C] hover:bg-primary dark:hover:bg-primary "
          >
            <div>
            <Image
              className="normal mx-auto lg:mx-0"
              height={70}
              width={70}
              src={"/assets/imgs/home/service.png"}
              alt="service-logo"
            />
            <Image
              className="hovered mx-auto lg:mx-0"
              height={70}
              width={70}
              src={"/assets/imgs/home/service_light.png"}
              alt="service-logo"
            />

            <h5 className="text-[18px] font-[700] my-[24px] text-center lg:text-start ">
              {service.title}
            </h5>
            <p className=" leading-[25.6px] text-fourth text-center lg:text-start dark:text-third ">
              {service.content}
            </p>
            </div>

            <Link
              href={`${destinations.services}?section=${service.id}`}
              className="mt-[70px] flex items-center gap-2 mx-auto lg:mx-0 "
            >
              <span className="text-primary">{t("global.read_more")}</span>

              <Image
                className={`${locale == "ar" && " rotate-180 "} normal`}
                height={14}
                width={18}
                src={"/assets/imgs/home/arrow.png"}
                alt="service-logo"
              />

              <Image
                className={`${locale == "ar" && " rotate-180"} hovered`}
                height={14}
                width={18}
                src={"/assets/imgs/home/arrow_light.png"}
                alt="service-logo"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
