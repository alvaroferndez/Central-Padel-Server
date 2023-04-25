<script setup>
import {adminStore} from "../../../stores/Admin/admin";
import {adminMatchStore} from "../../../stores/Admin/adminMatch";
import {authentificationStore} from "../../../stores/authentification";
import {ref} from "vue";

// stores
var admin = adminStore();
var adminMatch = adminMatchStore();
var authentification = authentificationStore();

// variables
var search_text = ref("");
var filter_users = ref([]);


// functions
adminMatch.getMatchById(admin.actual_component.props);
authentification.getAllUsers();

// edit the match in the database
function editMatch() {
  // call the function editMatch from the store adminMatch
  adminMatch.editMatch();
}

// filter the users by the search text of the variable search_text
function filterUsers() {
  filter_users.value =  authentification.users.filter((user) => {
    return user.email.toLowerCase().includes(search_text.value.toLowerCase());
  });
}

// add a player to the variable current_match of the store adminMatch. Only add to the client until edit button is pressed
function addUserToMatch(email) {
  // call the function addUserToMatch from the store adminMatch
  //
  // email: email of the player to add
  adminMatch.addUserToMatch(email);
}

// delete a player from the variable current_match of the store adminMatch. Only delete from the client until edit button is pressed
function deletePlayer(index) {
  // call the function deletePlayer from the store adminMatch
  //
  // index: index of the player to delete

  adminMatch.deletePlayer(index);
}
</script>


<template>
  <div class="container-add" v-if="adminMatch.current_match">
    <div>
      <label >Dia</label>
      <input type="text" v-model="adminMatch.current_match.date" placeholder="22/04/23">
    </div>
    <div>
      <label >Hora</label>
      <input type="text" v-model="adminMatch.current_match.hour" placeholder="16:45">
    </div>
    <div>
      <label >Pista</label>
      <input type="text" v-model="adminMatch.current_match.court" placeholder="3">
    </div>
    <div>
      <div v-for="player of adminMatch.current_match.players">
        <label >Jugador {{adminMatch.current_match.players.indexOf(player)+1}}</label>
        <input type="text" v-model="player.email" placeholder="seleccione un jugador...">
        <v-icon v-on:click="deletePlayer(adminMatch.current_match.players.indexOf(player))" name="ri-delete-back-2-fill"></v-icon>
      </div> 
    </div>
    <div>
      <input type="text" v-model="search_text" @input="filterUsers()" placeholder="Buscar...">
    </div>
    <ul>
      <li v-if="filter_users.length != authentification.users.length && authentification.users.length > 1" v-for="user of filter_users" v-on:click="addUserToMatch(user.email)" :key="user.email">
        {{ user.email }}
      </li>
    </ul>
    <button v-on:click="editMatch()">Añadir</button>
  </div>
  <button v-on:click="admin.changeSubcomponent('home')">Volver al home</button>
</template>


<style lang="scss"></style>