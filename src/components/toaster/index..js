import { toast } from "react-toastify";

const loadingToaster = (msg) => {
  return toast.loading(msg, {
    theme: 'dark', position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

const updateToasterToSuccess = (toasterId, msg) => {
  toast.update(toasterId, {
    render: msg, type: "success",
    isLoading: false,
    theme: 'dark',
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

const updateToasterToError = (toasterId, msg) => {
  toast.update(toasterId, {
    render: msg, 
    type: "error", 
    isLoading: false,
    theme: 'dark',
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export {
  updateToasterToError,
  updateToasterToSuccess,
  loadingToaster
}