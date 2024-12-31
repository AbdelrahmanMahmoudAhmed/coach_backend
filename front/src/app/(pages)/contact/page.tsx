import React from 'react'
import ContactForm from '@/components/general/ContactForm'
import { useTranslations } from "next-intl";
import PageTitle from '@/components/general/PageTitle';
import Title from '@/components/general/Title';
import  Image  from 'next/image';
function Contact() {
  const t = useTranslations('contact')
  return (
    <div className='app-container'>
<PageTitle title={t('title')} quote={t('quote')} />


 <section className=' mt-[80px] flex flex-col-reverse gap-x-[120px] gap-y-[60px] lg:flex-row 2xl:gap-x-[150px] '>

  <div className=''>
    <Title section="contact"/>
    
    <div className=' mt-[40px] '>
        <a className=' flex items-center gap-3 mb-[16px] max-w-[350px]' href={`tel:+6494461709`}>
        <Image 
          width={35}
          height={35}
          src={`/assets/imgs/contact/phone.png`}
          alt='phone'
        />
                <span>(02) 123456789</span>
        </a>
        <a className=' flex items-center gap-3 mb-[16px] max-w-[350px]' href={`mailto:hmaserv@gmail.com`}>
        <Image 
          width={35}
          height={35}
          src={`/assets/imgs/contact/email.png`}
          alt='email'
        />
                <span>hmaserv@gmail.com</span>

        </a>
        <a className=' flex items-center gap-3 mb-[16px] max-w-[350px]' target='_blank' href={`https://www.hmaserv.com`}>
        <Image 
          width={35}
          height={35}
          src={`/assets/imgs/contact/web.png`}
          alt='web'
        />
                <span>hmaserv@gmail.com</span>

        </a>
        <a className=' flex items-center gap-3 mb-[16px] max-w-[350px]' target='_blank' href={`https://www.google.com/maps/place/%D9%85%D8%AF%D8%B1%D8%B3%D8%A9+%D9%87%D8%AF%D9%89+%D8%B4%D8%B9%D8%B1%D8%A7%D9%88%D9%8A+%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%D8%A9+%D9%84%D9%84%D8%A8%D9%86%D8%A7%D8%AA%E2%80%AD/@31.2504494,29.9706523,21z/data=!4m6!3m5!1s0x14f5c394903c532b:0x423f2f4053a22d3b!8m2!3d31.2503419!4d29.9704818!16s%2Fg%2F1tf920zz?entry=ttu&g_ep=EgoyMDI0MTIwMS4xIKXMDSoASAFQAw%3D%3D`}>
        <Image 
          width={35}
          height={35}
          src={`/assets/imgs/contact/location.png`}
          alt='location'
        />
                <span>3 Galal Zahran, Louran, Second El Raml District, Alexandria</span>

        </a>
    </div>
  </div>
  <div className='flex-1'>
  <ContactForm />
  </div>
 </section>

      
    </div>
  )
}

export default Contact