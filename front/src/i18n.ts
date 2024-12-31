import {getRequestConfig} from 'next-intl/server';
import {getUserLocale} from './services/locale';

// Can be imported from a shared config
export const locales = ['en', 'ar'];
export const localeNames= {
  "en": "English",
  "ar": "العربية (Arabic)",
};
 
export default getRequestConfig(async () => {
  // Validate that the incoming `locale` parameter is valid
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});