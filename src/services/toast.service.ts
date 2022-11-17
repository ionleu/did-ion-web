import { toast } from "react-toastify";

import { TOAST_OPTIONS } from "../constants";

export const emitNotification = (type: "error" | "success", msg: string) => {
  toast[type](`ION: ${msg}`, TOAST_OPTIONS);
};
