'use server';

import { cookies } from 'next/headers';


interface SetCookiesParam {
  name:string;
  value : string;
}


export async function setCookies(opt:SetCookiesParam) {
  await cookies().set(opt);
}
export async function deleteCookies(opt : { name : string}) {
  await cookies().delete(opt);
}
export async function getCookies(opt: string)  {
  return cookies().get(opt)?.value;
}
