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

function editMatch() {
  adminMatch.editMatch();
}

function filterUsers() {
  filter_users.value =  authentification.users.filter((user) => {
    return user.email.toLowerCase().includes(search_text.value.toLowerCase());
  });
}

function addUserToMatch(email) {
  adminMatch.addUserToMatch(email);
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
      <label >Jugador 1</label>
      <input type="text" v-model="adminMatch.current_match.players[0].email" placeholder="jugador reves 1">
      <label >Jugador 2</label>
      <input type="text" v-model="adminMatch.current_match.players[1].email" placeholder="jugador derecha 1">
      <label >Jugador 3</label>
      <input type="text" v-model="adminMatch.current_match.players[2].email" placeholder="jugador reves 2">
      <label >Jugador 4</label>
      <input type="text" v-model="adminMatch.current_match.players[3].email" placeholder="jugador derecha 2">
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