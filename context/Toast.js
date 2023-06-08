import { toast } from "react-toastify";


const clearSuccess = () => {
   setInterval(() => {
        toast.dismiss();
    }, 2000); 
};

const clearErrors = () => {
    setInterval(() => {
        toast.dismiss();
    }, 3000); 
};


export const successToast = (message) => {
    console.log(message);

    toast.success(message);
    clearSuccess();
};

export const errorToast = (message) => {
    console.log(message);

    toast.error(message);
    clearErrors();
};


