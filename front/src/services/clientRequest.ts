


import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getCookies, setCookies, deleteCookies } from '@/utils/cookiesManipulate';
// import  notify  from "@/utils/notify";
// import { createTranslator } from 'use-intl';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});

axiosInstance.interceptors.request.use((config) => {
  // console.log('Making request to:', config.baseURL + config.url);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async(error) => {


    
    // notify( `${messages}.errors.requests.1`, { type: 'error' });
    // notify( `.errors.requests.1`, { type: 'error' });

    // error.response.data.customCode
    console.error('Axios error:' , error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    return Promise.reject(error);
  }
);


export interface AxiosOptions {
  auth?: boolean;
  method: AxiosRequestConfig['method'];
  url: string;
  formData?: Record<string, any>;
  withFiles?: boolean;
  arrayBufferResponse?: boolean;
}

export async function withAxios({
  auth = false,
  method,
  url,
  formData = {},
  withFiles = false,
}: AxiosOptions): Promise<any> {
  if (!url || !method) {
    console.error('Both the URL and the method must be provided.');
    return Promise.reject({ message: 'Both the URL and the method must be provided.' });
  }

  // Check network connectivity
  if (!navigator.onLine) {
    console.error('You are not online. Please check your network.');
    return Promise.reject({ message: 'You are not online. Please check your network.' });
  }

  let accessToken: string | undefined;
  if (auth) {
    // Get token from cookies
    accessToken = await getCookies('token'); // await the cookie value

    // If token does not exist, handle unauthorized access
    if (!accessToken) {
      handleNotAuthorized();
      return Promise.reject({ message: 'Unauthorized access.' });
    }

    // Optionally, you can check for token expiration and refresh it here
  }


  const config: AxiosRequestConfig = {
    method,
    timeout: 60000,
    url,
    ...(formData && { data: formData }),
    headers: {
      Accept: 'application/json',
      'Content-Type': withFiles ? 'multipart/form-data' : 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };

  
  try {
    

    const response: AxiosResponse = await axiosInstance(config);
    return response.data;
  } catch (err) {

    if (axios.isCancel(err)) {
      // Request was canceled
      return;
    }

    const errorResponse = (err as AxiosError).response;
    const returendError = (err as AxiosError).response?.data;
    console.error('Error Response:', errorResponse);

    // Handling specific error status codes
    switch (errorResponse?.status) {
      case 401: {
        handleNotAuthorized();
        break;
      }
      default:
        console.error(`Unhandled error status: ${errorResponse?.status}`);
    }

    // Rejecting the promise with structured error information
    return Promise.reject(returendError);
  }
}

const handleNotAuthorized = (): void => {
  // Reset user data or remove auth cookies
  deleteCookies({ name: 'token' });

  // Redirect to login page
  window.location.replace(`${window.origin}/panel/login`);
};

