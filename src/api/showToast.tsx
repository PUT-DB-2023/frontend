import { toast } from "react-toastify"
import { ToastMessages } from "types";

interface IShowToast {
    refetch: any;
    messages : ToastMessages;
}

export const showToast = async ({refetch, messages} : IShowToast) => {
    return await toast.promise(refetch, {
        pending: messages.pending,
        success: messages.success,
        error: messages.error,
    })
}