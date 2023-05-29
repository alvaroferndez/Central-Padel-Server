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

    // add match
    async function addMatch(match, fist = null, last = null) {
        // add a match whitout players
        //  
        //match: {
        //    date: date,
        //    time: time,
        //    court: court,
        //}
        //fist: the date of the first day of the week
        //last: the date of the last day of the week

        const response = await fetch(url + '/admin/match/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                match: match,
            }),
        });

        // data = {
        //      success: true/false
        //      error: error message
        // }
        const data = await response.json();

        if(data.success){
            toast.showSuccess("Partido añadido correctamente");

            // get all matchs of the week, to update the table
            getAllWeekMatchs(fist, last)
        }else{
            toast.showError(data.error);
        }
    }

    // delete match 
    async function deleteMatch(id, fist = null, last = null){
        // delete a match from table matchs and matchuser
        //
        //id: id of the match
        //fist: the date of the first day of the week
        //last: the date of the last day of the week

        const response = await fetch(url + '/admin/match/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_match: id,
            }),
        });

        // data = {
        //      success: true/false
        //      error: error message
        // }
        const data = await response.json();

        if(data.success){
            toast.showSuccess("Partido borrado correctamente");

            // get all matchs of the week, to update the table
            getAllWeekMatchs(fist, last)
        }else{
            toast.showError(data.error);
        }
    }

    // edit a match
    async function editMatch(){
        // edit a match whit players, that can be added or deleted, the match is store in the variable current_match
        const response = await fetch(url + '/admin/match/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                match: current_match.value,
            }),
        });

        // data = {
        //      success: true/false
        //      error: error message
        // }
        const data = await response.json();

        if(data.success){
            toast.showSuccess("Partido editado correctamente");

            // if the match is edited correctly, change the subcomponent to home, to go to the home of the component match
            admin.changeSubcomponent('home')
        }else{
            toast.showError(data.error);
        }
    }

    // add a player to a match
    async function addUserToMatch(user){
        // add a player to the variable current_match
        //
        // user: email of the user
        var user = await authentification.getUserByEmail(user);

        // check if the user is already in the match
        for (let i = 0; i< current_match.value.players.length; i++){
            if(current_match.value.players[i].email == user.data[0].email){
                toast.showError("El usuario ya está en el partido");
                return;
            }else if(current_match.value.players[i].email == ''){
                current_match.value.players[i] = user.data[0];
                toast.showSuccess("Jugador añadido correctamente");
                return
            }
        }

    }

    // add a player to a match
    async function addPlayerToMatch(id_match, email_user){
        // add a player to a match by client
        //
        // id_match: id of the match
        // email_user: email of the user

        const response = await fetch(url + '/admin/match/add_player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_match: id_match,
                email_user: email_user,
            }),
        });

        // data = {
        //      success: true/false
        //      error: error message
        // }

        const data = await response.json();
        
        if(data.success){
            toast.showSuccess("Jugador añadido correctamente");
        }else{
            toast.showError(data.error);
        }
    }

    // delete a player from a match
    async function deletePlayer(index){
        // delete a player from the variable current_match
        //
        // index: index of the player in the array of players
        current_match.value.players[index] = {
            email: '',
            name: '',
            username: '',
            position: '',
        }
        toast.showSuccess("Jugador borrado correctamente");
    }

    // get all matchs of the week
    async function getAllWeekMatchs(first, last) {
        // get all matchs of the week
        //
        // first: the date of the first day of the week
        // last: the date of the last day of the week

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

        // data = array of matchs
        const data = await response.json();

        // get all players of the matchs
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

            // data2 = match with players
            const data2 = await response.json();
            matchs.push(data2);
        }
        all_matchs.value = matchs;
        changeDate();
    }

    // get a match by id
    async function getMatchById(id){
        // get a match by id and store it in the variable current_match
        //
        // id: id of the match

        var response = await fetch(url + '/admin/match/getById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_match: id,
            }),
        });

        // data = match
        const data = await response.json();
        response = await fetch(url + '/admin/match/getAll2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                match: data,
            }),
        });

        // data2 = match with players
        const data2 = await response.json();
        current_match.value = data2;
    }

    // change the date of the matchs to a date format
    function changeDate() {
        for (let match of all_matchs.value) {
            // if the date is not empty
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


    return { all_matchs, matchs_getted, current_match, addMatch, deleteMatch, editMatch, addUserToMatch, addPlayerToMatch, deletePlayer, getAllWeekMatchs, getMatchById }
})
