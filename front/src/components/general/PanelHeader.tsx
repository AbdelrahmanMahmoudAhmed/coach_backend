"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ChangeTheme from "./ChangeTheme";
import ChangeLang from "./ChangeLang";
import { useTheme } from "@/hooks/useThemeHook";
import { useLocale } from "next-intl";
import { deleteCookies } from "@/utils/cookiesManipulate";
import { useRouter } from "next/navigation";
import Modal from "@/components/general/Modal";
import { useTranslations } from "next-intl";

const Header = ({ links }: { links: any[] }) => {
  const t = useTranslations();

  const locale = useLocale();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((val) => !val);
  };
  const theme = useTheme();
  const logout = () => {
    deleteCookies({ name: "token" });
    router.replace("/panel/login");
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          closeModal={closeModal}
          title={"logout"}
          action={logout}
          actionTitle="logout"
        >
          <div>{t("popup.logout_req")}</div>
        </Modal>
      )}

      <header className="panel-container h-[100px] bg-[#414040] dark:footer-bg  ">
        <div className="flex items-center h-full justify-between ">
          <div>
            <Link href="/">
              <Image
                src={`/assets/imgs/dark-logo.png`}
                alt="logo"
                width={70}
                height={100}
              />
            </Link>
          </div>

          <div>
            <div className="flex gap-3 items-center">
              <ChangeTheme />
              {/* <span className="w-[1px] bg-[#565656] h-[20px]"></span> */}
              <div className="">
                <ChangeLang hideText={true} />
              </div>
              <span className=" cursor-pointer  " onClick={toggleSidebar}>
                <Image
                  src={`/assets/imgs/icons/burger.svg`}
                  alt="logo"
                  width={50}
                  height={50}
                />
              </span>
            </div>
          </div>
        </div>
      </header>

      <div></div>
      <div
        onClick={toggleSidebar}
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } fixed top-0 left-0 h-[100vh] w-[100vw] bg-transparent backdrop-blur-[4px]`}
      ></div>

      <div
        className={`fixed z-30 top-0 h-[100vh] transition-all duration-500 overflow-hidden bg-[#535353] dark:bg-[#1f1f1f] ${
          isSidebarOpen ? "w-[300px] p-2" : " w-0 p-0 lg:w-[100px] lg:p-2"
        } ${locale == "ar" ? "right-0" : "left-0"} `}
      >
        <div className="pt-[15px] w-fit mx-auto">
          <Link href="/">
            <Image
              src={`/assets/imgs/dark-logo.png`}
              alt="logo"
              width={104}
              height={64}
            />
          </Link>
        </div>

        <div className=" flex flex-col justify-between h-[85vh]">
          <div className="pt-[80px]">
            {links.map((item , idx) => (
              <Link href={item.link} key={idx} className={` ${isSidebarOpen ? 'justify-end  pe-8' : ' justify-center '} mb-6 w-full flex items-center gap-4 mx-auto transition-all duration-300 text-white hover:text-primary hover:translate-x-[-8px] rtl:hover:translate-x-[8px]`}>
                <div
                  className={`overflow-hidden whitespace-nowrap font-[700]  ${
                    isSidebarOpen ? " w-auto" : " w-0"
                  } `}
                >
                  {t(`panel.${item?.title}`)}
                </div>

                <span >
                  <Image
                    src={`/assets/imgs/icons/${item.icon}.svg`}
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </span>
              </Link>
            ))}
          </div>

          <button
            onClick={openModal}
            className=" flex items-center justify-center gap-2 mx-auto"
          >
            <span className={`${isSidebarOpen ? "block" : "hidden"} font-[700] text-white hover:text-primary`}>
              {t("panel.logout")}
            </span>

            <Image
              className={`${locale == "en" && "rotate-180"}`}
              src={`/assets/imgs/icons/logout.svg`}
              alt="logo"
              width={50}
              height={50}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
