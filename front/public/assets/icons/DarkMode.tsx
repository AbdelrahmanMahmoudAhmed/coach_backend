"use client";
import React, { useEffect, useState } from 'react';
import { usePathname  } from 'next/navigation';


export default function DarkModeIcon() {

  const path = usePathname();
  const [color , setColor] = useState('#79767D');

  useEffect(()=>{
    if(path.startsWith('/panel') ){
      setColor( '#FF6B00' )
    }
  },[])
  return (
    <svg width={path.startsWith('/panel') ?33 : 24} height={path.startsWith('/panel') ?33 : 24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Regular'>
        <path id='Vector' d='M20.25 10.5V6' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_2' d='M22.5 8.25H18' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_3' d='M15.75 2.25V5.25' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_4' d='M17.25 3.75H14.25' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path
          id='Vector_5'
          d='M20.315 14.3062C18.8425 14.7191 17.2866 14.7326 15.8072 14.3454C14.3277 13.9582 12.978 13.1841 11.8966 12.1027C10.8152 11.0214 10.0412 9.67162 9.65392 8.19216C9.26668 6.7127 9.28022 5.15683 9.69313 3.68433C8.24138 4.0884 6.92083 4.86578 5.86302 5.93904C4.8052 7.01231 4.04704 8.34399 3.66406 9.80144C3.28107 11.2589 3.28663 12.7913 3.68017 14.2459C4.07371 15.7006 4.8415 17.0267 5.90706 18.0923C6.97263 19.1578 8.29878 19.9256 9.75342 20.3192C11.2081 20.7127 12.7404 20.7183 14.1979 20.3353C15.6553 19.9523 16.987 19.1941 18.0603 18.1363C19.1335 17.0785 19.9109 15.758 20.315 14.3062V14.3062Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
}
