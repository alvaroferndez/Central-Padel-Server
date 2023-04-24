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
    const url = authentification.url;
    var all_matchs = ref([]);
    var matchs_getted = ref(false);
    var current_match = ref(false);

    // functions
    async function addMatch(match, fist = null, last = null) {
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
            getAllWeekMatchs(fist, last)
        }else{
            toast.showError(data.error);
        }
    }

    async function deleteMatch(id, fist = null, last = null){
        const response = await fetch(url + '/admin/match/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_match: id,
            }),
        });
        const data = await response.json();
        console.log(data);
        if(data.success){
            toast.showSuccess("Partido borrado correctamente");
            getAllWeekMatchs(fist, last)
        }else{
            toast.showError(data.error);
        }
    }

    async function editMatch(){
        const response = await fetch(url + '/admin/match/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                match: current_match.value,
            }),
        });
        const data = await response.json();
        if(data.success){
            toast.showSuccess("Partido editado correctamente");
            admin.changeSubcomponent('home')
        }else{
            toast.showError(data.error);
        }
    }

    async function addUserToMatch(user){
        var user = await authentification.getUserByEmail(user);
        for (let i = 0; i< current_match.value.players.length; i++){
            if(current_match.value.players[i].email == user.email){
                toast.showError("El usuario ya está en el partido");
                return;
            }else if(current_match.value.players[i].email == ''){
                current_match.value.players[i] = user.data;
                toast.showSuccess("Jugador añadido correctamente");
                console.log(current_match.value);
                return
            }
        }

    }

    async function getAllWeekMatchs(first, last) {
        var matchs=[];
        var response = await fetch(url + '/admin/match/getAll', {
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
        for(let match of data){
            var response = await fetch(url + '/admin/match/getAll2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    match: match,
                }),
            });
            const data2 = await response.json();
            matchs.push(data2);
        }
        all_matchs.value = matchs;
        changeDate();
    }

    async function getMatchById(id){
        var response = await fetch(url + '/admin/match/getById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_match: id,
            }),
        });
        const data = await response.json();
        current_match.value = data;
        response = await fetch(url + '/admin/match/getAll2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                match: current_match.value,
            }),
        });
        const data2 = await response.json();
        current_match.value = data2;
        console.log(data2)
    }

    function changeDate() {
        for (let match of all_matchs.value) {
            if(match.date.length > 2){
                let dateString = match.date;
                let parts = dateString.split('/');
                let year = '20' + parts[2];
                let month = parts[1] - 1;
                let day = parts[0];
                let date = new Date(year, month, day);
                match.date = date.getDate();
            }
        }
    }


    return { all_matchs, matchs_getted, current_match, addMatch, deleteMatch, editMatch, addUserToMatch, getAllWeekMatchs, getMatchById }
})
