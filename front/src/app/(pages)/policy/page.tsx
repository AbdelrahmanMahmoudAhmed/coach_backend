import React from 'react'
import Title from '@/components/general/Title'
import { useTranslations } from "next-intl";
import  useDateAndNums  from "@/utils/datesAndNums"
import { useLocale } from "next-intl";
import RenderHtmlContent from '@/components/general/RenderHtmlContent';


function Policy() {
  const t = useTranslations('global');
  const locale = useLocale();


  const { useDate } = useDateAndNums()

  const content = `
    <body>
    <p>Thank you for choosing to be part of our community at HMA LLC ("Company," "we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at <a href="mailto:support@hmaserv.com">support@hmaserv.com</a>.</p>
    <br /><br />
    <p>When you visit our website <a href="http://hmaserv.com" target="_blank">http://hmaserv.com</a> (the "Website"), and more generally, use any of our services (the "Services," which include the Website), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our services immediately.</p>
<br /><br />
    <p>This privacy notice applies to all information collected through our services (which, as described above, includes our Website), as well as any related services, sales, marketing, or events.</p>

    <p>Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.</p>
    
    <h2>1. What Information Do We Collect?</h2>
    <p>We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.</p>
<br />
    <ul>
        <li>
            <strong>Personal Information Provided by You:</strong> We collect names; phone numbers; email addresses; mailing addresses; job titles; usernames; passwords; contact preferences; and other similar information.
        </li>
        <li>
            <strong>Sensitive Information:</strong> We do not process sensitive information.
        </li>
        <li>
            <strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (e.g., a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor, and you should review its privacy policies and contact the payment processor directly to respond to your questions.
        </li>
    </ul>
    <br /><br />
    <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
</body>
  `

  const date =  useDate(Date.now() , locale ) || `   ${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()}`;
  return (
    <div className='app-container my-[60px]'>
      <div className=''>
        <Title  section="policy" />
        <span className= ' block mt-1 font-[500] text-fourth dark:text-third'> {t('last_updated')} { date }</span>
      </div>

      <RenderHtmlContent content={content} />
    </div>
  )
}

export default Policy