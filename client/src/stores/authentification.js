import { ref } from 'vue'
import { defineStore } from 'pinia'
import {toastStore} from "./toast";

export const authentificationStore = defineStore('authentification', () => {
    // const url = 'http://localhost:3080/api'
    const url = 'http://centralpadelgranada.me:3080/api';

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
                setActiveUserPhoto();
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

    async function setActiveUserPhoto() {
        if(user.value.path){
            user.value.photo = await getImage(user.value.path);
        }
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

    function uploadImage(image) {
        fetch(url + '/user/upload_image', {
            method: 'POST',
            body: image,
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    toast.showSuccess('Imagen subida');
                }else{
                    toast.showError(data.error);
                }
            });
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
        let form_data = new FormData();

        form_data.append('name', user.value.name);
        form_data.append('user_name', user.value.user_name);
        form_data.append('surname', user.value.surname);
        form_data.append('phone', user.value.phone);
        form_data.append('email', user.value.email);
        form_data.append('age', user.value.age);
        form_data.append('dni', user.value.dni);
        form_data.append('position', user.value.position);
        form_data.append('category', user.value.category);
        form_data.append('club', user.value.club);
        form_data.append('years_played', user.value.years_played);
        form_data.append('experience', user.value.experience);

        if(user.value.photo){
            form_data.append('photo', user.value.photo);
        }

        fetch(url + '/user/update', {
            method: 'POST',
            body: form_data,
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

    async function getImage(image){
        if(image == undefined)
            return;

        let new_image = image.split('.')[0] + '/' + image.split('.')[1]
        var response = await fetch(url + '/admin/product/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            image: new_image
            })
        }).then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(error => console.log(error));
        return response;
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
            for(let user of users.value){
                if(user.path){
                    user.photo = await getImage(user.path);
                }
            }
        }
    }
  
    return { url, user, menu_status, users, login, register, uploadImage, show, checkUserLogged, logout, changeData, getUserByEmail, getImage, getAllUsers}
})
