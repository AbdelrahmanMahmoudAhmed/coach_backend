"use client"
import React from 'react'
import {useAppSelector} from "@/hooks/useReduxHooks" 

function Loader() {
    const loaderState = useAppSelector((state) => state.global.loader);

  return (
    <>
    {loaderState && (
         <div className="flex justify-center items-center fixed h-[100vh] w-[100vw] top-0 left-0 z-[999999]  ">
         <div className="bg-slate-200/20  absolute w-full h-full">
         </div>
         <div className=" absolute w-full h-full flex justify-center items-center z-[-1] bg-slate-200/20 ">
         </div>
         <div className="  w-12 aspect-square rounded-full border-4 border-[#DBDBDB] border-t-primary animate-spin dark:border-t-primary dark:border-[#605f5f]" />
       </div>
    )}
</>
  )
}

export default Loader