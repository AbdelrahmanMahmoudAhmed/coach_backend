import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Title from "../general/Title";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/utils/constants";
function OurProjects() {
  const t = useTranslations();
  const locale = useLocale();

  const projects = [
    {
      id:"1",
      title: "Cinema Prime Plus",
      desc_ar:
        "تطبيق يقدم مجموعة واسعة من الأفلام والمسلسلات من مختلف الأنواع، مما يسمح للمستخدمين بمشاهدة المحتوى المفضل لديهم بجودة عالية في أي وقت. كما يوفر إمكانية الوصول إلى مكتبة واسعة من الإنتاجات الحصرية والإصدارات الجديدة.",
      desc_en:
        "An application offering a wide range of movies and series across various genres, allowing users to watch their favorite content in high quality at any time. It also provides access to an extensive library of exclusive productions and new releases.",
      color: "#00AAE1",
      image: "cenema",
    },
    {
      id:"2",
      title: "Market Bff ",
      desc_ar:
        "موقع يتيح للمستخدمين شراء حسابات متنوعة مثل Gmail وAmazon وLinkedIn وغيرها، يقدم الموقع منصة آمنة وسهلة الاستخدام لشراء الحسابات الجاهزة، مع خيارات متعددة لتلبية احتياجات المستخدمين بسرعة وأمان.",
      desc_en:
        "A website that allows users to purchase various accounts such as Gmail, Amazon, LinkedIn, and more. The site offers a secure and easy-to-use platform for buying ready-made accounts, with multiple options to meet users' needs quickly and safely.",
      color: "#F11237",
      image: "bff",
    },
    {
      id:"3",
      title: "Cezma",
      desc_ar:
        "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
      desc_en:
        "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      color: "#FF6B00",
      image: "cezma_web",
    },
    {
      id:"4",
      title: "Cezma",
      desc_ar:
        "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
      desc_en:
        "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      color: "#0963FF",
      image: "cezma_mob",
    },
  ];

  return (
    <section className="app-container mt-[80px]">
      <Title section="projects" />

      <div className=" project-silder-holder overflow-hidden cursor-context-menu mt-10 flex flex-col gap-8 sm:flex-row  ">
        <ul
          className={`project-slider inline-block ${
            locale == "ar" ? "project-slider-ar" : "project-slider-en"
          } flex flex-col gap-10 sm:flex-row `}
        >
          {projects.map((project, idx) => (
            <li>
            <Link  href={`${destinations.project}/${project.id}`}
              style={{ backgroundColor: project.color }}
              key={idx}
              className={`  flex flex-col justify-between relative flex-1 text-white max-w-[520px] rounded-[8px] py-[40px] px-[24px] sm:w-[430px] sm:max-w-[unset] lg:p-[60px] lg:w-[490px] `}
            >
              <div>
                <div className="flex justify-between mb-10">
                  <h5 className="text-[40px] font-[700] w-[210px] leading-[40px] lg:w-[283px] ">
                    {project.title}
                  </h5>
                  <span>
                    <Image
                      src={"/assets/imgs/home/project_arrow.png"}
                      alt="arrow"
                      width={50}
                      height={50}
                    />
                  </span>
                </div>
                <p className="text-[14px] mb-10 ">
                  {locale == "ar" ? project.desc_ar : project.desc_en}
                </p>
              </div>
              <Image
                className=" mx-auto transition-all duration-1000 hover:scale-125 "
                src={`/assets/imgs/home/${project.image}.png`}
                alt="arrow"
                width={300}
                height={225}
              />

              <Image
                className=" absolute bottom-2 right-2 z-20 sm:hidden "
                src={"/assets/imgs/home/absolute.png"}
                alt="dots"
                width={128}
                height={122}
              />
            </Link>
            </li>
          ))}
        </ul>
        <ul
          className={`project-slider inline-block ${
            locale == "ar" ? "project-slider-ar" : "project-slider-en"
          } hidden sm:flex sm:gap-10 `}
        >
          {projects.map((project, idx) => (
            <li
              style={{ backgroundColor: project.color }}
              key={idx}
              className={`  flex flex-col justify-between relative flex-1 text-white max-w-[520px] rounded-[8px] py-[40px] px-[24px] sm:w-[430px] sm:max-w-[unset] lg:p-[60px] lg:w-[490px] `}
            >
              <div>
                <div className="flex justify-between mb-10">
                  <h5 className="text-[40px] font-[700] w-[210px] leading-[40px] lg:w-[283px] ">
                    {project.title}
                  </h5>
                  <Link href={`${destinations.project}/${project.id}`}>
                    <Image
                      src={"/assets/imgs/home/project_arrow.png"}
                      alt="arrow"
                      width={50}
                      height={50}
                    />
                  </Link>
                </div>
                <p className="text-[14px] mb-10 ">
                  {locale == "ar" ? project.desc_ar : project.desc_en}
                </p>
              </div>
              <Image
                className=" mx-auto transition-all duration-1000 hover:scale-125 "
                src={`/assets/imgs/home/${project.image}.png`}
                alt="arrow"
                width={300}
                height={225}
              />

              <Image
                className=" absolute bottom-2 right-2 z-20 sm:hidden "
                src={"/assets/imgs/home/absolute.png"}
                alt="dots"
                width={128}
                height={122}
              />
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

export default OurProjects;
