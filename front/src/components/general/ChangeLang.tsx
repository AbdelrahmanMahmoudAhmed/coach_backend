

import { useLocale } from 'next-intl';
import  { setUserLocale } from "@/services/locale"
import { LangIcone } from '@/assets/icons';


function ChangeLang({hideText}:{hideText?:boolean}) {
  const locale = useLocale();

  const changeLang = ( ) => {
    const newState = locale == 'ar' ? 'en' : 'ar'
    setUserLocale(newState )
  }


  return (
    <button onClick={changeLang} className='flex items-center gap-3'>
      <span  className={` ${hideText ? 'hidden' : 'font-[300]'}`}>{ locale == 'ar' ? 'English' : 'عربى' }</span>
        <LangIcone />
    </button>
   );
}
export default ChangeLang
