const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-.\\()\/])[^:*'?;<>"]{8,}$/;
const phoneRegex = /^(6|7|8|9)\d{8}$/;

module.exports = {
    validateEmail(email) {
        return emailRegex.test(email)
    },

    validatePassword(password) {
        return passwordRegex.test(password)
    },

    validatePhone(phone) {
        return phoneRegex.test(phone)
    }
}