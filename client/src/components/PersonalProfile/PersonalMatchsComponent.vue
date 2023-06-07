<script setup>
import { adminMatchStore } from '../../stores/Admin/adminMatch';
import { authentificationStore } from '../../stores/authentification';
import Match from '../MatchComponent.vue';


// stores
const adminMatch = adminMatchStore();
const authentification = authentificationStore();

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

function getClientMatch(match) {
  let is_client = false;


  for(let player of match.players){
    if(player.email == authentification.user.email) {
      is_client = true;
    }
  }

  return is_client;
}


getNextSevenDays();
adminMatch.getAllWeekMatchs(days[0], days[6]);

</script>


<template>
  <section class="global-container">
    <div class="container-all">
      <h1>Tus partidos</h1>
      <div class="container-matchs">
        <Match v-for="match of adminMatch.all_matchs" :class="!getClientMatch(match) ? 'none' : ''" :match="match" :add="false"/>
      </div>
      <div v-if="adminMatch.all_matchs.length == 0">No hay partidos disponibles</div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container{
  .container-all{
    // size
    width: 100%;

    // display
    @include flexbox(column);

    .container-matchs{
      @include autoGrid(50%, 0.5rem);
      width: 100%;
      .none{
      display: none;
      }
    }
  }

  @media screen and (max-width: 576px) {
    &{
      // size
      width: 100% !important;
    }
  }
}



</style>