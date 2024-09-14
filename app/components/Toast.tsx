import React, { useEffect } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 flex items-center gap-2">
      <IoInformationCircleOutline size={24} className="text-white" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
