"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import datesAndNums from "@/utils/datesAndNums";
import { useLocale } from "next-intl";
import Image from "next/image";

const TableComponent = ({
  headers,
  rows,
  page,
  hasLinks,
  isLoading,
  hasPagination,
  perPage,
  totalCount,
  currentPage,
  addTitle,
  addAction,
  deleteAction,
  editAction,
  customAction,
  navigation,
  
}: {
  headers: string[];
  rows: any[];
  page: string;
  hasLinks?: boolean;
  isLoading?: boolean;
  hasPagination?:boolean;
  perPage?:number,
  totalCount?:number,
  currentPage?:number ;
  addTitle?:string;
  addAction?: () => void;
  editAction?: (item: object) => void;
  deleteAction?: (item: object) => void;
  customAction?: (item: object) => void;
  navigation?: (item: "next" | "prev") => void;
}) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("");
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const { useArabicDates, useEnglishDates, useNums } = datesAndNums();

  const [totalPages , setTotalPages] = useState(0);

  useEffect(()=>{
    // setTotalPages()

    if(totalCount && perPage) setTotalPages(Math.ceil(totalCount / perPage));
    console.log(currentPage);
    },[totalCount])
 
  const handleEditAction = (item: object) => {
    if (editAction) editAction(item);
  };





  return (
    <div className="  overflow-hidden ">
      <div
        className={`w-full overflow-auto ${"pb-[50px] mt-[20px] mb-[60px]"} px-0`}
      >
        <div className="my-2 flex justify-end">
          <button
            className=" py-2 px-4 rounded-lg text-white bg-green-800 hover:opacity-75 "
            onClick={addAction}
          >
            {addTitle ? t(`table.${addTitle}`) : t(`table.add`)}
          </button>
        </div>
        {rows?.length && !isLoading ? (
          <table className="w-full border-separate border-spacing-y-0">
            <thead className="rounded-[20px] overflow-hidden w-full">
              <tr className="">
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={`py-[5px] px-0 font-[700] text-primary bg-gray-200 dark:bg-[#292929] ${
                      (locale === "ar" && idx === 0) ||
                      (locale === "en" && idx === headers.length - 1)
                        ? "first-child"
                        : (locale === "en" && idx === 0) ||
                          (locale === "ar" && idx === headers.length - 1)
                        ? "last-child"
                        : ""
                    }`}
                  >
                    <div
                      className={`${
                        idx === 0 ? "ms-3 justify-center " : "justify-center"
                      } w-full flex h-[50px] items-center px-6 text-[18px]`}
                    >
                      {t(`table.headers.${header}`)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${"bg-gray-100 dark:bg-[#383838]"} row hover:bg-[#f3b70215] dark:hover:bg-[#f3b70215] transition-all ${
                    hasLinks ? "cursor-pointer" : ""
                  }`}
                >
                  {row.map((td: any, i: number) => (
                    <td
                      key={i}
                      className={`px-6 border-b border-primary ${"text-[18px] py-[23px]"}`}
                    >
                      <div
                        className={`${
                          td?.withImg ? "ms-3" : "flex"
                        } gap-2 justify-center items-center `}
                      >
                        {td.isAction ? (
                          <div
                            key={i}
                            className={` flex gap-2 justify-center items-center`}
                          >
                            {td.hasCustom ? (
                              <button className=" py-2 px-4 rounded-lg text-white bg-primary hover:opacity-75 ">
                                {t(`table.${td.customTitle}`)}
                              </button>
                            ) : (
                              ""
                            )}
                            {td.hasEdit ? (
                              <button
                                className=" py-2 px-4 rounded-lg text-white bg-blue-600 hover:opacity-75"
                                onClick={() => handleEditAction(td.currentItem)}
                              >
                                {t(`table.edit`)}
                              </button>
                            ) : (
                              ""
                            )}
                            {td.hasDelete ? (
                              <button onClick={()=>deleteAction && deleteAction(td.currentItem)} className=" py-2 px-4 rounded-lg text-white bg-red-800 hover:opacity-75">
                                {t(`table.delete`)}
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : td?.isImg ? (
                          <img
                            className="w-[70px] rounded-lg"
                            src={ td?.item ? baseURL + td?.item : "/assets/imgs/placeholder.jpg"}
                            alt=""
                          />
                        ) : td?.isDate ? (
                          <div className="flex items-center gap-2 w-full md:w-auto md:min-w-[50%]">
                            <span className="whitespace-nowrap">
                              {locale === "ar"
                                ? useArabicDates(td?.item) || "_"
                                : useEnglishDates(td?.item || "_")}
                            </span>
                          </div>
                        ) : (
                          <span className="whitespace-nowrap">
                            {useNums(
                              locale,
                              locale == "ar" ? td?.item_ar : td?.item_en
                            ) || "_"}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {hasPagination && currentPage ? (
            <tfoot className="">
              <tr>
                <th colSpan={headers.length}>
                  <div className=" bg-gray-200 dark:bg-[#292929] p-1 rounded-b-lg flex items-center justify-center gap-3 rtl:flex-row-reverse">
                    <button disabled={currentPage <= 1  }   onClick={()=>navigation && navigation('prev')} className=" cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                   
                      <Image
                        width={50}
                        height={50}
                        src="/assets/imgs/icons/prev.svg"
                        alt="heading-sign"
                      />
                    </button>
                    <span className="text-primary text-[24px] font-bold ">
                      {useNums(locale, currentPage)}
                    </span>
                    <button disabled={ totalPages <= currentPage   } onClick={()=>navigation && navigation('next')} className=" cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                      <Image
                        width={50}
                        height={50}
                        src="/assets/imgs/icons/next.svg"
                        alt="heading-sign"
                      />
                    </button>
                  </div>
                </th>
              </tr>
            </tfoot>
            ) : ""}
          </table>
        )  : isLoading ? (
          <div className="min-h-[50vh] flex justify-center items-center text-[25px] md:[32px]">
            {t("global.loading_data")}
          </div>
        ) : !rows?.length && !isLoading ? (
          <div className="min-h-[50vh] flex justify-center items-center text-[25px] md:[32px]">
            {t("global.no_data_available")}
          </div>
        ): null}
      </div>
    </div>
  );
};

export default TableComponent;
