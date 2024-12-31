"use client";
import React, { useEffect, useState } from 'react';
import { usePathname  } from 'next/navigation';

export default function LangIcone() {


const path = usePathname();


return (

<svg width={path.startsWith('/panel') ?27 : 17} height={path.startsWith('/panel') ?27 : 17} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier"> <path fill="none" stroke={path.startsWith('/panel') ? "#FF6B00" :  "#B6AAAA"} strokeWidth={2} d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8" /> </g>
</svg>

  );

}
