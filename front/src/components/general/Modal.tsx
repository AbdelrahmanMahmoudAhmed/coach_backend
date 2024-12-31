import React from "react";
import { ModalProps } from "@/types/interfaces";
import { useTranslations } from "next-intl";

function Modal({ closeModal, title, children , action, actionTitle}: ModalProps) {
  const t = useTranslations();
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      

      <div
        onClick={closeModal}
        className="backdrop fixed z-0 h-screen w-screen bg-gray-500/30 "
      ></div>
      
      <div className=" app-bg relative z-10  flex max-h-[90vh] w-[90%] flex-col overflow-y-auto rounded-lg border-0 shadow-lg outline-none focus:outline-none  sm:w-[70%] md:w-[60%] lg:w-[50%]">
        
        <div className=" relative rounded-t border-b border-solid border-gray-300 p-5 dark:border-slate-500 ">
          <button
            className=" absolute h-7 w-7 flex items-center justify-center rounded-md bg-primary text-center text-[1.2rem] text-white dark:bg-primary dark:text-black hover:opacity-75 "
            onClick={closeModal}
          >
            x
          </button>
          <h3 className="font=semibold text-[20px] text-center sm:text-3xl">
            {t(`popup.${title}`)}
          </h3>
        </div>

        <div className=" px-5 py-8 text-center text-[16px] sm:text-[18px] md:text-[20px] ">
          {children}
        </div>
        
        <div className="  flex justify-start gap-3 rounded-b border-t border-solid border-gray-300 p-5 dark:border-slate-500 ">
       
       {actionTitle ? ( 
        <button
          name="action"
            className={` text-white rounded-lg font-bold w-fit px-10 py-2 text-[16px] md:m-[unset] dark:text-black hover:opacity-75  ${actionTitle == 'delete' ?  'dark:bg-red-700 bg-red-700' : 'dark:bg-primary bg-primary' } `}
            onClick={action}
          >
            {t(`popup.${actionTitle}`)}
          </button>
          ) : ""}
          <button
          name="close"
            className=" bg-primary text-white rounded-lg font-bold w-fit px-10 py-2 text-[16px] md:m-[unset] dark:bg-primary dark:text-black hover:opacity-75"
            onClick={closeModal}
          >
            {t(`popup.close`)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
