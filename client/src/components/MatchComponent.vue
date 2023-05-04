<script setup>
import {ref} from "vue";

// variables
const props = defineProps(['match'])
var show = ref(true);

// functions
function setMatchs(){
  var count = 0;

  for(let player of props.match.players){
    if(player.email !== ''){
      count++;
    }
  }

  if(count == 4){
    show.value = false;
  }
}

setMatchs();
</script>


<template>
    <div class="match" v-if="show">
      <div class="match-header">
        <section class="container-image">
          <div v-for="player of props.match.players" class="position">
            <img :title="player.email ? player.email : 'sin definir'" :src="player.photo ? player.photo : '../../../src/assets/images/profile-photo.webp'" :alt="player.email">
            <p>{{ player.email ? player.email : 'sin definir' }}</p>
          </div>
        </section>
      </div>
      <div class="match-content">
        <div class="container-data">
          <div>
            <label>Dia</label>
            <span>{{ props.match.date }}</span>
          </div>
          <div>
            <label>Hora</label>
            <span>{{ props.match.hour }}</span>
          </div>
          <div>
            <label>Pista</label>
            <span>{{ props.match.court }}</span>
          </div>
        </div>
        <div class="container-button">
          <button type="button" @click="goToMatch(props.match.id)">Apuntarse</button>
        </div>
      </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";


.match{
  border: 1px solid black;

  //size
  width: 40%;
  height: 500px;
  &-header{
    width: 100%;
    height: 50%;

    .container-image{
      //size
      width: 100%;
      height: 100%;

      // decoration
      background-image: url('@/assets/images/padel-court.webp');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      .position{
        // size
        width: 50px;
        height: 50px;

        // display
        @include flexbox(column);

        // decoration
        border-radius: 50%;

        &:nth-child(1){
          // position
          position: absolute;
          top: 10%;
          left: 30%;
        }

        &:nth-child(2){
          // position
          position: absolute;
          top: 10%;
          right: 10%;
        }

        &:nth-child(3){
          // position
          position: absolute;
          bottom: 10%;
          left: 10%;
        }

        &:nth-child(4){
          // position
          position: absolute;
          bottom: 10%;
          right: 10%;
        }

        img{
          // size
          width: 100%;
          height: 100%;

          // decoration
          border-radius: 50%;
        }
      }
    }
  }
}
</style>