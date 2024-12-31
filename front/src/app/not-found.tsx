
import {  useTranslations } from "next-intl";
import Button from "@/components/general/Button";
import { destinations } from "@/utils/constants";

export default function NotFound() {

  const t = useTranslations()
    return (
        <section className='mx-auto max-w-screen-xl h-[100vh] px-4 py-8 lg:px-6 lg:py-16'>
          <div className='mx-auto max-w-screen-sm text-center mt-[20vh]'>
            <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>404</h1>
            <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>{t('errors.not_found_one')}</p>
            <p className='mb-10 text-lg font-light text-gray-500 dark:text-gray-400'>{t('errors.not_found_two')} </p>
            <div className="flex justify-center">
            <Button  text={t('errors.to_home')} withArrow={true} location={destinations.home} />
            </div>
          </div>
        </section>
    );
  }