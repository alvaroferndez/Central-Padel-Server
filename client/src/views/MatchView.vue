<script setup>
import {authentificationStore} from "../stores/authentification";
import {adminMatchStore} from "../stores/Admin/adminMatch";
import Match from "../components/MatchComponent.vue";


// stores
const adminMatch = adminMatchStore()

// variables
var days = [];
var days_complete = [];
var days_week = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
var today = new Date();

// functions
function getNextSevenDays() {
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const month = nextDay.getMonth() + 1;
    const date = nextDay.getDate();
    const dateString = `${date < 10 ? "0" + date : date}/${
        month < 10 ? "0" + month : month
    }/${nextDay.getFullYear()}`;
    days.push(dateString);
    days_complete.push({
      day: days_week[nextDay.getDay()],
      number: nextDay.getDate(),
      date: dateString
    });
  }
}


getNextSevenDays();
adminMatch.getAllWeekMatchs(days[0], days[6]);
</script>


<template>
  <div class="global-container">
    <Match v-for="match of adminMatch.all_matchs" :match="match"/>
  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";


.global-container{
  // display
  @include flexbox(column);
}
</style>