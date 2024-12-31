"use client";
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';



interface ButtonProps {
    text: string;           // The button text
    withArrow?: boolean;    // Whether to show an arrow (optional)
    location: string;      // Location to navigate or refer (optional)
  }
  
  const Button: React.FC<ButtonProps> = ({ text, withArrow = false, location }) => {
    const locale = useLocale();

    
  return (
    <Link href={location} className=' w-fit text-white text-[16px] font-[700] h-[45px] flex items-center gap-3 px-[32px] bg-gradient-to-r from-[#FF3F00] to-[#FF8100] rounded-[50px] hover:opacity-80 xl:text-[18px] 2xl:h-[55px] 2xl:px-[40px] '>
       <span> {text}</span>
       {withArrow && (
       <Image 
       className={`${locale == 'ar' && 'rotate-180'}`}

        src={`/assets/imgs/icons/arrow.png`}
        alt="close-image" 
        width={24}    
        height={24}     
            
/>
)}
    </Link>
  )
}

export default Button