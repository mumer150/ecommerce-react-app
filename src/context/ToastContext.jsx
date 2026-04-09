import { CircleCheck } from "lucide-react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const ToastContexts = createContext();

export const ToastContext = ({ children }) => {
  const AddedNotify = (message) => {
    toast.success(message);
  };
  
  const AlreadyAddedNotify =(message)=>{
     toast.error(message);
  }


  return (
    <>
      <ToastContexts.Provider value={{ AddedNotify ,AlreadyAddedNotify  }}>
        {children}
      </ToastContexts.Provider>
    </>
  );
};
