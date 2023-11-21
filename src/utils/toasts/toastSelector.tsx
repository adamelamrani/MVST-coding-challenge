import { toast } from "react-toastify";
import { ToastTypeEnum } from "./ToastTypeEnum";
/**
 * This is a helper function to select the toast type.
 *   It receives  3 arguments:
 *      - type: ToastTypeEnum
 *      - error: Error | null
 *      - custom: string | null
 *      Error and custom are optional arguments.
 *   It returns a function that calls the toast function from react-toastify.
 */
export const toastSelector = (
  type: ToastTypeEnum,
  error?: Error | null,
  custom?: string | null
) => {
  let notify;

  switch (type) {
    case ToastTypeEnum.LOADING:
      notify = () =>
        toast("Fetching data from GitHub...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          toastId: "toastLoading",
        });
      break;
    case ToastTypeEnum.ERROR:
      notify = () =>
        toast.error(`${error?.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          toastId: "toastError",
        });
      break;
    case ToastTypeEnum.SUCCESS:
      notify = () =>
        toast.success(custom ? custom : "Data fetched successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          toastId: "toastSuccess",
        });
      break;
    case ToastTypeEnum.CUSTOM:
      notify = () =>
        toast(custom, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          toastId: "toastCustom",
        });
      break;
  }
  return notify;
};
