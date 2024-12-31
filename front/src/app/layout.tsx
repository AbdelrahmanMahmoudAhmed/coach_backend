import type { Metadata } from "next";
import "@/public/assets/style/globals.css";

const title = "HMASERV | Web & Mobile Application Development";
const description = `HMASERVe: a Mobile & Web Application Development Company in Alexandria, Egypt.
At HMASERVe, we specialize in crafting cutting-edge mobile and web applications tailored to meet the needs of enterprises across diverse industries. With a deep-rooted expertise in creating dynamic, user-friendly digital experiences, our mission is to empower businesses and individuals to effectively engage with their audiences. HMASERVe is committed to delivering innovative solutions that drive success and growth in the digital age.`
const url = process.env.NEXT_PUBLIC_BASE_URL_API;
const icon = '/assets/imgs/dark-logo.png'
export const metadata: Metadata = {
  title,
  description ,
  icons: {
    icon,
  },
  keywords:"Mobile Application Development Alexandria, Web Application Development Egypt, Enterprise App Development, Custom Mobile Solutions, Innovative Web Solutions, App Development Services, Digital Transformation, User-Friendly Applications, Cross-Platform App Development, Mobile and Web App Experts, Alexandria Software Development, HMASERVe Web Solutions, Business App Development, Egypt Mobile Developers, Web Design and Development Alexandria",
  openGraph: {
    title,
    description,
    type: 'website',
    images: [icon ],
    siteName:title,
    url,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [icon],
  },
};

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "@/components/Providers/StoreProvider";
import { cookies } from "next/headers";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  

  return (
    <html lang={locale}>
      <body
        className={`  ${cookies().get("theme")?.value || "light"} transition-all delay-100 `}
        dir={cookies().get("NEXT_LOCALE")?.value == "ar" ? "rtl" : "ltr"}
      >
        <NextIntlClientProvider messages={messages}>
        <ToastContainer />
          <StoreProvider>
              <section className=" app-bg">
                <main className="  mx-auto relative" >{children}</main>
              </section>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 
