import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Title from "@/components/general/Title";
import { notFound } from "next/navigation";
import { useLocale } from 'next-intl';
import useDateAndNums from "@/utils/datesAndNums";


interface PageProps {
  params: { id: string };
}
function Project({ params }: PageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { useNums } = useDateAndNums()


  const challengs = [
    "Identifying the target audience: It's essential to understand the needs and desires of the target demographic to design a user experience that meets their expectations.",
    "Balancing users and sellers.",
    "Marketing and brand awareness.",
    "Competing with other platforms: The app needs unique features to attract users away from competitors in the market.",
  ];

  const projects = [
    {
      id: "1",
      title: "Cinema Prime Plus",
      desc_ar:
        "تطبيق يقدم مجموعة واسعة من الأفلام والمسلسلات من مختلف الأنواع، مما يسمح للمستخدمين بمشاهدة المحتوى المفضل لديهم بجودة عالية في أي وقت. كما يوفر إمكانية الوصول إلى مكتبة واسعة من الإنتاجات الحصرية والإصدارات الجديدة.",
      desc_en:
        "An application offering a wide range of movies and series across various genres, allowing users to watch their favorite content in high quality at any time. It also provides access to an extensive library of exclusive productions and new releases.",
      color: "#00AAE1",
      image: "cenema",
    },
    {
      id: "2",
      title: "Market Bff ",
      desc_ar:
        "موقع يتيح للمستخدمين شراء حسابات متنوعة مثل Gmail وAmazon وLinkedIn وغيرها، يقدم الموقع منصة آمنة وسهلة الاستخدام لشراء الحسابات الجاهزة، مع خيارات متعددة لتلبية احتياجات المستخدمين بسرعة وأمان.",
      desc_en:
        "A website that allows users to purchase various accounts such as Gmail, Amazon, LinkedIn, and more. The site offers a secure and easy-to-use platform for buying ready-made accounts, with multiple options to meet users' needs quickly and safely.",
      color: "#F11237",
      image: "bff",
    },
    {
      id: "3",
      title: "Cezma",
      desc_ar:
        "موقع يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
      desc_en:
        "An Website that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      color: "#FF6B00",
      image: "cezma_web",
    },
    {
      id: "4",
      title: "Cezma",
      desc_ar:
        "تطبيق يتيح للمستخدمين شراء المنتجات بسهولة بكميات كبيرة من خلال تجربة تسوق شاملة، حيث يمكن للمستخدمين تصفح العروض المتاحة وإنشاء منتجاتهم الخاصة وإدارة متجرهم الإلكتروني لبيع المنتجات، ويوفر التطبيق مرونة في التسوق وإدارة المتاجر الإلكترونية بطريقة مبتكرة وسلسة.",
      desc_en:
        "An application that allows users to easily purchase products in bulk through a comprehensive shopping experience. Users can browse available offers, create their own products, and manage their online store to sell products. The app provides flexibility in shopping and managing online stores in an innovative and seamless way.",
      color: "#0963FF",
      image: "cezma_mob",
    },
  ];

  const currentProject = projects.find((item) => item.id == params.id);
  if (!currentProject) notFound();

  return (
    <div className="">
      <section className="  overflow-hidden shadow-md app-container relative text-white bg-dark-bg min-h-[650px] py-[70px] flex flex-col justify-between gap-y-6 lg:py-[100px] lg:flex-row ">
        <span
          style={{
            background: `radial-gradient(${currentProject.color}, #121212 ,#121212)`,
          }}
          className=" opacity-10 absolute top-[-20%] left-[-20%] w-[500px] h-[70%] rounded-full xl:top-[-115px] xl:left-[-115px]"
        ></span>
        <span
          style={{
            background: `radial-gradient(${currentProject.color}, #121212 ,#121212)`,
          }}
          className=" opacity-10 absolute bottom-[-20%] right-[-20%] w-[500px] h-[70%] rounded-full xl:bottom-[-115px] xl:right-[-70px]"
        ></span>

        <div className=" w-full lg:w-[45%]">
          <Image
            src="/assets/imgs/project/logo.png"
            alt="logo"
            width={200}
            height={64}
          />

          <h1 className=" font-[700] my-[40px] text-[40px] leading-[40px]  ">
            {currentProject.title}
          </h1>
          <p className="text-[14px] sm:text-[16px] ">
            An application that allows users to easily purchase products in bulk
            through a comprehensive shopping experience. Users can browse
            available offers, create their own products, and manage their online
            store to sell products. The app provides flexibility in shopping and
            managing online stores in an innovative and seamless way.
          </p>
          <div className="flex gap-[50px] md:gap-[100px]  ">
            <div className="mt-6">
              <h3 className=" font-[700] text-[18px] sm:text-[20px] lg:text-[24px] ">
                {t("projects.lang")}
              </h3>
              <ul className="flex flex-col gap-3 pt-5 text-[16px] sm:text-[18px] ">
                <li>flutter</li>
                <li>React</li>
                <li>node.js</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className=" font-[700] text-[18px] sm:text-[20px] lg:text-[24px] ">
                {t("projects.platform")}
              </h3>
              <ul className="flex flex-wrap gap-5 pt-5 text-[16px] sm:text-[18px] ">
                <li className=" flex flex-col gap-3 items-center justify-center ">
                  {" "}
                  <div>
                    <Image
                      height={35}
                      width={35}
                      alt="app"
                      src="/assets/imgs/project/app.png"
                    />
                  </div>{" "}
                  <span>{t("projects.app")}</span>
                </li>
                <li className=" flex flex-col gap-3 items-center justify-center ">
                  {" "}
                  <div>
                    <Image
                      height={35}
                      width={35}
                      alt="web"
                      src="/assets/imgs/project/web.png"
                    />
                  </div>{" "}
                  <span>{t("projects.web")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center max-w-[500px] mx-auto lg:max-w-[unset] lg:w-[45%]">
          <Image
            src="/assets/imgs/project/project.png"
            alt="logo"
            width={696}
            height={525}
          />
        </div>
      </section>
      <section className="app-container">
        <div className=" my-[70px] lg:my-[100px] ">
          <h3 className="text-[32px] leading-[30px] font-[700] mb-[30px] lg:mb-[40px] lg:text-[40px] ">
            {t("projects.key_objectives")}
          </h3>
          <p className=" text-[16px] md:text-[18px] lg:max-w-[60%] 2xl:max-w-[50%] ">
            Developing a secure and user-friendly platform that enables users to
            buy and sell products easily, while enhancing interaction between
            buyers and sellers through direct communication features and
            improving the user experience to facilitate browsing and product
            search.
          </p>
        </div>
        <div>
          <h3 className="text-[32px] leading-[30px] font-[700] mb-[30px] lg:mb-[40px] lg:text-[40px] ">
            {t("projects.challenge")}
          </h3>
          <div>
            {challengs.map((item) => (
              <div className="flex gap-2 mb-6 lg:max-w-[60%] 2xl:max-w-[50%]">
                <div className=" w-[30px] ">
                  <Image
                    width={30}
                    height={30}
                    src="/assets/imgs/project/star.png"
                    alt="heading-sign"
                  />
                </div>
                <p className="flex-1 w-full leading-[24.4px] text-[16px] md:text-[18px] ">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          backgroundImage: "url('/assets/imgs/project/middle.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
        }}
        className=" my-[60px] h-[375px] md:h-[500px] xl:h-[683px] xl:my-[100px]"
      ></section>
      <section className="app-container">
        <Title section="result" />

        <div className="flex items-center flex-col justify-evenly gap-8 mt-[70px] md:mt-[60px] md:flex-row md:gap-4 xl:gap-6">
            <div className="flex flex-col items-center gap-2 ">
                <span className="text-[40px] font-[700] ">{useNums(locale ,  5000)}+</span>
                <span className="  md:text-[18px] font-[700] text-fourth dark:text-third  ">{t('projects.download')}</span>
            </div>
            <div className=" bg-[#DDDDDD] dark:bg-[#565656] mx-2 w-[85%] h-[1px] md:w-[1px] md:h-[70px] "></div>
            <div className="flex flex-col items-center gap-2  ">
                <span className="text-[40px] font-[700] ">{useNums(locale ,  8)} {t('projects.months')} </span>
                <span className="  md:text-[18px] font-[700] text-fourth dark:text-third ">{t('projects.duration')}</span>
            </div>
            <div className=" bg-[#DDDDDD] dark:bg-[#565656] mx-2 w-[85%] h-[1px] md:w-[1px] md:h-[70px] "></div>
            <div className="flex flex-col items-center gap-2">
                <span className="text-[40px] font-[700] ">{useNums(locale ,  4.5)}+</span>
                <span className=" md:text-[18px] font-[700] text-fourth dark:text-third ">{t('projects.rating')}</span>
            </div>
        </div>
      </section>
      <section className="app-container my-[60px] md:my-[100px]">
      <h3 className=" text-[32px] leading-[30px] font-[700] mb-[40px] lg:mb-[70px] lg:text-[40px] ">
            {t("projects.say")}
          </h3>
          <div className="flex gap-[12px] md:gap-[20px] md:items-center">
            <div className=" w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] lg:w-[180px] lg:h-[180px] ">
            <Image
                    width={180}
                    height={180}
                    src="/assets/imgs/project/person.png"
                    alt="client"
                  />
            </div>
            <div className=" relative w-full max-w-[70%] sm:max-w-[80%] 2xl:max-w-[65%] md:text-[18px] ">
              <div className=" absolute opacity-30 w-full h-full top-0 left-0 flex justify-center  ">
             <div className="w-[120px] h-[120px] lg:w-[200px] lg:h-[200px]">
             <Image
                    width={200}
                    height={200}
                    src="/assets/imgs/home/quote.png"
                    alt="client"
                  />
             </div>
            
              </div>
              <p className=" mb-[30px]">I was thoroughly impressed with the app development service. The team delivered a high-quality, user-friendly app that exceeded my expectations.</p>
              <div>
                <h6 className="font-[700] mb-1">Ahmed Mohamed</h6>
                <span className="text-fourth dark:text-third">Cezma Client</span>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}

export default Project;
