"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { EmailIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/utils/constants";
import { usePathname } from "next/navigation";

function Footer() {
  const pathName = usePathname();

  const [contactInfo, setContactInfo] = useState([
    {
      val: "(02) 123456789",
      link: "tel:+6494461709",
    },
    {
      val: "hmaserv@gmail.com",
      link: "mailto:hmaserv@gmail.com",
    },
    {
      val: "www.hmaserv.com",
      link: "www.hmaserv.com",
    },
  ]);

  const sections = {
    home: destinations.home,
    services: destinations.services,
    about: destinations.about,
    contact: destinations.contact,
  };

  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-container footer-bg py-3 pt-[40px]">

      <div className="flex flex-col md:flex-row md:justify-between gap-y-[50px] gap-x-[30px] ">
        <div>
          <div className="max-w-[400px]">
            <Image
              src="/assets/imgs/footer-logo.png"
              alt="logo"
              width={150}
              height={92}
            />
            <p className=" mt-[24px] leading-custom text-[14px] sm:text-[16px]  ">
              We are one of the leading companies in the fields of web hosting,
              web development, app development, and embedded systems industries.
            </p>
          </div>
          <ul className="flex gap-[24px] mt-[24px]">
            <li>
              <Link href="https://www.facebook.com">
                <Image
                  src="/assets/imgs/icons/facebook.png"
                  alt="facebook"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com">
                <Image
                  src="/assets/imgs/icons/linkedin.png"
                  alt="linkedin"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
            <li>
              <Link href={`mailto:someone@example.com`}>
                <Image
                  src="/assets/imgs/icons/mail.png"
                  alt="email"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
          </ul>
        </div>

        <div className=" flex justify-between w-full md:w-[50%] lg:w-[33%] ">
          <div>
            <h6 className=" text-[20px] font-[600] mb-8 sm:text-[24px]">
              {t("footer.our_company")}
            </h6>
            <ul>
              {Object.entries(sections).map(([key, href]) => (
                <li className="mb-[10px] " key={key}>
                  <Link
                    href={href}
                    className={`${
                      pathName === href ? "text-primary" : ""
                    } transition-all duration-100 lg:text-[16px] hover:text-primary `}
                  >
                    {t(`header.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className=" text-[20px] font-[600] mb-8 sm:text-[24px]">
              {t("footer.contact_info")}
            </h6>
            <ul>
              {contactInfo.map(({ val, link }) => (
                <li className="mb-[10px] " key={val}>
                  <Link
                    href={link}
                    className={`transition-all duration-100 lg:text-[16px] hover:text-primary `}
                  >
                    {val}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className=" py-[24px] mt-[50px] border-t border-white flex flex-col items-center gap-y-4 justify-between sm:mt-[20px] md:flex-row ">
        <div>
        {t('footer.copy' , {year :currentYear})}
        </div>
        <div className="flex gap-12">
        <Link className="hover:text-primary" href={destinations.terms}>{t('footer.terms_of_service')}</Link>
        <Link className="hover:text-primary" href={destinations.policy}>{t('footer.privacy_policy')}</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
