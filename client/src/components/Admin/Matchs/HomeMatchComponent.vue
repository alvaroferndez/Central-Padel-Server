<script setup>
import {adminStore} from "../../../stores/Admin/admin";
import {adminMatchStore} from "../../../stores/Admin/adminMatch";

// stores
const admin = adminStore();
const adminMatch = adminMatchStore();

// variables
const days = [];

// functions

function getNextSevenDays() {
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const month = nextDay.getMonth() + 1;
    const date = nextDay.getDate();
    const dateString = `${date < 10 ? "0" + date : date}/${
        month < 10 ? "0" + month : month
    }/${nextDay.getFullYear()}`;
    days.push(dateString);
  }
}
getNextSevenDays();

adminMatch.getAllWeekMatchs(days[0], days[6]);
</script>


<template>
  <h3 v-on:click="admin.changeSubcomponent('add')">Añadir partido</h3>

</template>


<style lang="scss"></style>