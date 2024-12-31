import React from 'react'
import Button from "@/components/general/Button";
import { destinations } from "@/utils/constants";
import { useTranslations } from "next-intl";

function LetsTalk() {
    const t = useTranslations();

    
  return (
    <section className=" flex flex-col gap-[40px] lg:flex-row mb-[25px] lg:items-center lg:justify-between lg:mb-[40px]">
    <div className=' '>
    <span className="block text-[32px] font-[700] leading-[30px] lg:text-[40px] ">{t('global.ready')}</span>
    <span className="block text-[32px] font-[700] lg:text-[40px] ">{t('global.lets')}</span>
    </div>
    <Button text={t('global.talk')} location={destinations.contact} withArrow={true}  />
  </section>
  )
}

export default LetsTalk