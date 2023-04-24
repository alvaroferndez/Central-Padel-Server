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
            admin.changeSubcomponent("home");
            getAllWeekMatchs(fist, last)
        }else{
            toast.showError(data.error);
        }
    }

    async function getAllWeekMatchs(first, last) {
        console.log(first, last)
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

    return { all_matchs, matchs_getted, addMatch, getAllWeekMatchs }
})
