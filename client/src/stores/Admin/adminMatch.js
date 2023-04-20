import { ref } from 'vue'
import { defineStore } from 'pinia'
import {authentificationStore} from "../authentification";
import {toastStore} from "../toast";
import {adminStore} from "./admin";


export const adminMatchStore = defineStore('adminMatch', () => {
    // stores
    const authentification = authentificationStore();
    const toast = toastStore();
    const admin = adminStore();

    // variables
    const url = authentification.url

    // functions
    async function addMatch(match) {
        const response = await fetch(url + '/admin/match/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                match: match,
            }),
        });
        const data = await response.json();
        if(data.success){
            toast.showSuccess("Partido añadido correctamente");
            admin.changeSubcomponent("home");
        }else{
            toast.showError(data.error);
        }
    }

    async function getAllWeekMatchs(first, last) {
        const response = await fetch(url + '/admin/match/getAll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first: first,
                last: last,
            }),
        });
        const data = await response.json();
        console.log(data)
    }

    return { addMatch, getAllWeekMatchs }
})
