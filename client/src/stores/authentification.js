import { ref } from 'vue'
import { defineStore } from 'pinia'


export const authentificationStore = defineStore('authentification', () => {
    const url = 'http://localhost:3080/api'

    var user = ref(
        {
            id: null,
            email: '',
            name: '',
            password: '',
            token: '',
            role: '',
        }
    );

    function login(email, password) {
        fetch(url + '/login', {
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
            console.log(data)
            user.value.name = data[0].name
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
