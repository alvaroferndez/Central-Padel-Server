<script setup>
import {adminStore} from "../../../stores/Admin/admin";
import {adminMatchStore} from "../../../stores/Admin/adminMatch";


// stores
const admin = adminStore();
const adminMatch = adminMatchStore();

// variables
var match = {
  date: "",
  hour: "",
  court: ""
}

// functions
function addMatch() {
  adminMatch.addMatch(match);
}
</script>


<template>
  <div class="container-add">
    <div>
      <label >Dia</label>
      <input type="text" v-model="match.date" placeholder="22/04/23">
    </div>
    <div>
      <label >Hora</label>
      <input type="text" v-model="match.hour" placeholder="16:45">
    </div>
    <div>
      <label >Pista</label>
      <input type="text" v-model="match.court" placeholder="3">
    </div>
    <button v-on:click="addMatch()">Añadir</button>
  </div>
  <button v-on:click="admin.changeSubcomponent('home')">Volver al home</button>
</template>


<style lang="scss"></style>