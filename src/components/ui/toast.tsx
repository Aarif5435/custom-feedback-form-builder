import React from 'react';
import { toast, ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

interface ToastType {
    type: string;
    message: string;
}

export const showToast = (type: string, message: string) => {
    console.log(type,message)
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'dark':
      toast.dark(message);
      break;
    default:
      toast(message);
  }
  return (
    <ToastContainer />
  )
};

