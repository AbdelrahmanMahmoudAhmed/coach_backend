"use client";
import React, { useEffect, useState } from 'react';
import { usePathname  } from 'next/navigation';



export default function LightModeIcon() {
  const path = usePathname();
  const [color , setColor] = useState('#fff');

  useEffect(()=>{
    if(path.startsWith('/panel') ){
      setColor( '#FF6B00' )
    }
  },[])
  return (
    <svg  width={path.startsWith('/panel') ?33 : 24} height={path.startsWith('/panel') ?33 : 24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Light Mode Icon'>
        <path id='Vector' d='M12 17.625C15.1066 17.625 17.625 15.1066 17.625 12C17.625 8.8934 15.1066 6.375 12 6.375C8.8934 6.375 6.375 8.8934 6.375 12C6.375 15.1066 8.8934 17.625 12 17.625Z' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_2' d='M12 3.375V1.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_3' d='M5.89707 5.89683L4.5752 4.57495' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_4' d='M3.375 12H1.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_5' d='M5.89707 18.103L4.5752 19.4249' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_6' d='M12 20.625V22.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_7' d='M18.1035 18.103L19.4254 19.4249' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_8' d='M20.625 12H22.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_9' d='M18.1035 5.89683L19.4254 4.57495' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </g>
    </svg>
  );
}
