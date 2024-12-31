
import {ServerRequestOptions } from "@/types/interfaces"
import { json } from "stream/consumers";

export async function makeServerRequest<T extends any>({
  method = 'GET',
  url,
  formData = null,
  withFiles = false,
  arrayBufferResponse = false,
  abortControllerSignal = null,
}: ServerRequestOptions): Promise<T> {
  if (!url || !method) {
    return Promise.reject({message:'Both the URL and the method must be provided.'});
  }


  const requestHeaders: HeadersInit = {
    Accept: 'application/json',
    Platform: 'web',
  };



  if (!withFiles) {
    requestHeaders['Content-Type'] = 'application/json';
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}${url}`, {
      method,
      headers: requestHeaders,
      body: formData ? JSON.stringify(formData)  : undefined,
      signal: abortControllerSignal ? abortControllerSignal : undefined,
      next: { revalidate: 60 }, // Revalidate in 60 seconds
    });

    if (!response.ok) {
      const errorText = await response.text();
      return Promise.reject(`Error: ${response.status} - ${errorText}`);
    }

    const data = arrayBufferResponse ? await response.arrayBuffer() : await response.json();
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
