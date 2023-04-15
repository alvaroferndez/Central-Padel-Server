import { ref } from 'vue'
import { defineStore } from 'pinia'


export const regExStore = defineStore('regEx', () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-.\\()\/])[^:*'?;<>"]{8,}$/;
    const phoneRegex = /^(6|7|8|9)\d{8}$/;

    function validateEmail(email) {
        return emailRegex.test(email)
    }

    function validatePassword(password) {
        return passwordRegex.test(password)
    }

    function validatePhone(phone) {
        return phoneRegex.test(phone)
    }
    return { validateEmail, validatePassword, validatePhone }
})
