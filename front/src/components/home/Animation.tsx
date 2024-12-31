"use client"
import React from 'react'
import { useTranslations } from "next-intl";
import LottieDark from '../lottie/LottieDark';
import LottieLight from '../lottie/LottieLight';

function Animation() {
    const t = useTranslations("home.animation");


  return (
    <section className=' app-container mt-[100px] lg:mb-[20px]'>
        <h3 className='text-[24px] font-[700] px-4 mx-auto text-center max-w-[400px] leading-[40px] sm:text-[30px] sm:max-w-[500px] lg:max-w-[690px] lg:text-[40px] '>
            <span>{t('syllable_one')}</span>
            <span className=' text-primary '>{t('syllable_two')}</span>
            <span>{t('syllable_three')}</span>
        </h3>
<div className=' mt-5 hidden dark:block '>
<LottieDark />
</div>
<div className=' mt-5 block dark:hidden 2xl:mt-20'>
    <LottieLight />
</div>



    </section>
  )
}

export default Animation