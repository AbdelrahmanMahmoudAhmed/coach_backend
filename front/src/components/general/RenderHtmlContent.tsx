import React from 'react'



export interface WithValidationsProps {
    content: string;
  }

const  RenderHtmlContent :React.FC<WithValidationsProps> =({content}) => {




  return (
    <section className='mt-[60px]'>
    <div   dangerouslySetInnerHTML={{ __html: content }}></div>
    </section>
)
}

export default RenderHtmlContent