import { ref } from 'vue'
import { defineStore } from 'pinia'
import {useToast} from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';


export const toastStore = defineStore('toast', () => {
    const toast = useToast();

    function showSuccess(message, duration = 1500) {
        toast.success(message, {
            position: 'top',
            duration: duration,
            dismissible: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false,
        });
    }

    function showError(message, duration = 1500) {
        toast.error(message, {
            position: 'top',
            duration: duration,
            dismissible: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false,
        });
    }

    return { showSuccess, showError }
})
