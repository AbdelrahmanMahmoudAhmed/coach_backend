"use client";

import React from 'react'
import { useTranslations } from "next-intl";

function PanelTitle({title } : {title: string}) {
    const t = useTranslations();

  return (
    <h1 className='text-[36px] text-primary font-[700] text-center mt-8 mb-2 ' >{t(`panel_title.${title}`)}</h1>
  )
}

export default PanelTitle