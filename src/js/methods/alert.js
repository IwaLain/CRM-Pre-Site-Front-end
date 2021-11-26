import { toast } from "react-toastify";

export const alert = (type, message) => {
  let notify = () => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warn(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        break;
    }
  };
  return notify();
};
