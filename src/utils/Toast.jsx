// src/utils/Toast.jsx
import toast from "react-hot-toast";
import Toast3D from "@/components/atoms/Toast3D";

export const showToast = (message, type = "info") => {
  toast.custom((t) => (
    <div
      className={`transform transition-all duration-300  mb-2 ${
        t.visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <Toast3D message={message} type={type} />
    </div>
  ));
};

export const showSuccess = (msg) => showToast(msg, "success");
export const showError = (msg) => showToast(msg, "error");
export const showInfo = (msg) => showToast(msg, "info");
