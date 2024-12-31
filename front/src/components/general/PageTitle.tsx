import React from 'react'


type PageTitleProps  = {
    title : string ;
    quote : string ;
}  

const PageTitle : React.FC<PageTitleProps> =({title , quote}) => {
  return (
    <div className="max-w-[663px] mx-auto px-2 text-center pt-[60px]">
    <h1 className="font-[700] text-[32px] lg:text-[40px] ">{title}</h1>
    <p className=" text-[14px] text-fourth md:text-[16px] dark:text-third">
    {quote}
    </p>
  </div>
  )
}

export default PageTitle