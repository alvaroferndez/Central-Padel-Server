import { ref } from 'vue'
import { defineStore } from 'pinia'
import {authentificationStore} from "../authentification";
import {toastStore} from "../toast";
import {adminStore} from "./admin";


export const adminUserStore = defineStore('adminUser', () => {
    // stores
    const authentification = authentificationStore();
    const toast = toastStore();
    const admin = adminStore();

    // variables
    const url = authentification.url;
    var actual_user = ref({});


    // functions

    // delete user
    async function deleteUser(email) {
        var response = await fetch(url + '/admin/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        var data = await response.json();

        if(data.success){
            toast.showSuccess("Usuario eliminado correctamente");
            authentification.getAllUsers();
        }else{
            toast.showError(data.error);
        }
    }

    // edit user
    async function editUser() {
        var response = await fetch(url + '/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: actual_user.value,
            }),
        });
        var data = await response.json();

        if(data.success){
            toast.showSuccess("Usuario editado correctamente");
            // authentification.getAllUsers();
            admin.changeProps('');
            admin.changeSubcomponent('home');
        }else{
            toast.showError(data.error);
        }
    }

    async function getUserByEmail(email){
        var response = await authentification.getUserByEmail(email);
        actual_user.value = response.data[0];
    }
    return { actual_user, deleteUser, editUser, getUserByEmail }
})
