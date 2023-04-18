import { ref } from 'vue'
import { defineStore } from 'pinia'
import {toastStore} from "./toast";

export const authentificationStore = defineStore('authentification', () => {
    const url = 'http://localhost:3080/api'

    const current_device = navigator.userAgent;

    const menu_status = ref(false);

    const toast = toastStore();

    var user = ref(
        {
            logged: false,
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
                device: current_device,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            user.value = data[0];
            user.value.logged = true;
        })
    }

    function checkUserLogged(email) {
        fetch(url + '/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                device: current_device,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(data.logged){
                user.value = data;
                console.log(user.value)
                if(user.value.name){
                    toast.showSuccess('Bienvenido de nuevo ' + user.value.name);
                }else{
                    toast.showSuccess('Bienvenido de nuevo ' + user.value.email);
                }
            }
        })
    }

    async function register(email, password, phone) {
        const response = await fetch(url + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const data = await response.json();
        return data;
    }

    async function logout(email) {
        const response = await fetch(url + '/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                device: current_device,
            }),
        });
        const data = await response.json();
        console.log(data)
        if(data.success){
            user.value = {
                logged: false,
            };
        }
        return data.success;
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
  
    return { user, login, register, show, checkUserLogged, logout, menu_status }
})
