import { ref } from 'vue'
import { defineStore } from 'pinia'
import {toastStore} from "./toast";

export const authentificationStore = defineStore('authentification', () => {
    const url = 'http://localhost:3080/api'

    const current_device = navigator.userAgent;

    const menu_status = ref(false);

    const toast = toastStore();

    const users = ref([]);

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

    function checkUserLogged(email, first = true) {
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
            const newData = data.map(item => {
                for (const key in item) {
                    if (item.hasOwnProperty(key) && item[key] === null) {
                        item[key] = '';
                    }
                }
                return item;
            });
            if(newData[0].logged){
                user.value = newData[0];
                console.log(user.value)
                if(first) {
                    if (user.value.name) {
                        toast.showSuccess('Bienvenido de nuevo ' + user.value.user_name);
                    } else {
                        toast.showSuccess('Bienvenido de nuevo ' + user.value.email);
                    }
                }else{
                    toast.showSuccess('Datos restablecidos');
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
                photo: '',
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
        })
    }

    function changeData(){
        fetch(url + '/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.value,
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    toast.showSuccess('Datos actualizados');
                }else{
                    toast.showError(data.error);
                    checkUserLogged(JSON.parse(localStorage['user']), false)
                }
            });
    }

    async function getUserByEmail(email){
        var response = await fetch(url + '/user/get_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        const data = await response.json();
        return data;
    }

    async function getAllUsers(){
        var response = await fetch(url + '/user/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json();
        if(data.success){
            users.value = data.data;
        }
    }
  
    return { url, user, menu_status, users, login, register, show, checkUserLogged, logout, changeData, getUserByEmail, getAllUsers}
})
