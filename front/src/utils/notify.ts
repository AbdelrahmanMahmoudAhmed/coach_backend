import { toast, ToastOptions } from 'react-toastify';

// Type definition for the function's parameters
export  default function notify(message: string, options?: ToastOptions) {
  toast(message, {
    type: 'info',
    theme: 'colored',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // transition: 'Bounce',

    ...options, // Merges custom options
  });
}
