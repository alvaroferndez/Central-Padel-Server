import { ref } from 'vue'
import { defineStore } from 'pinia'


export const authentificationStore = defineStore('authentification', () => {
    const url = 'http://localhost:3080/api'

    var user = ref(
        {
        }
    );

    async function login(email, password) {
        await fetch(url + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            user.value = data[0];
            console.log(user.value)
            return true
        })
    }

    async function register(email, password, phone) {
        await fetch(url + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                phone: phone,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            user = data[0];
            return true
        })
    }

    function show() {
        fetch(url + '/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
    }
  
    return { user, login, register, show }
})
