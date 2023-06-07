<script setup>
import {ref} from "vue";
import { adminMatchStore } from "../stores/Admin/adminMatch";
import { authentificationStore } from "../stores/authentification";
import {toastStore} from "../stores/toast";
import {routerStore} from "../stores/router";

// variables
const props = defineProps(['match','add'])
var show = ref(true);
const adminMatch = adminMatchStore();
const auth = authentificationStore();
const router = routerStore();
const toast = toastStore();

// functions
async function setMatchs(){
  var count = 0;

  for(let player of props.match.players){
    if(player.email !== ''){
      count++;
    }

    if(player.path != '' && player.path != undefined){
      player.photo = await auth.getImage(player.path)
    }
  }

  if(count == 4){
    show.value = false;
  }
}

function addToMatch(){
  let i = 0;
  for(let player of props.match.players){
    if(player.email != '' && player.email != undefined ){
      console.log(player.email);
      i++;
    }
  }
  if(i == 4){
    toast.showError('El partido esta completo');
    return;
  }
  adminMatch.addPlayerToMatch(props.match.id, auth.user.email);
  router.navigateTo('/');
}

function viewPlayer(player){
  // router.navigateTo('/player', {email: player.email});
  console.log(player);
}

setMatchs();
</script>


<template>
    <div class="match" v-if="show">
      <div class="match-header">
        <section class="container-image">
          <div v-for="player of props.match.players" @click="viewPlayer(player)" class="position" :class="player.email == auth.user.email && props.add ? 'is-added' : ''">
            <img :title="player.email ? player.email : 'vacio'" :src="player.photo ? player.photo : '../../../src/assets/images/profile-photo.webp'" :alt="player.email">
            <p>{{ player.email ? player.email : 'vacio' }}</p>
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
        <div class="container-button" v-if="props.add">
          <button style="--c:#E95A49" type="button" @click="addToMatch()">Apuntarse</button>
        </div>
      </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";


.match{

  //size
  width: 100%;
  height: 550px;

  // margin
  margin: 1rem auto;
  
  &-header{
    width: 100%;
    height: 50%;

    @include flexbox(row);

    .container-image{
      //size
      width: 50%;
      height: 100%;

      // decoration
      background-image: url('@/assets/images/padel-court.webp');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 20px;

      .position{
        // size
        width: 50px;
        height: 50px;

        // display
        @include flexbox(column);

        // decoration
        border-radius: 50%;
        color:$h-c-white-shade;
        font-weight: 400;
        cursor: pointer;

        &:nth-child(1){
          // position
          position: absolute;
          top: 15%;
          left: 30%;
        }

        &:nth-child(2){
          // position
          position: absolute;
          top: 20%;
          right: 10%;
        }

        &:nth-child(3){
          // position
          position: absolute;
          bottom: 25%;
          left: 10%;
        }

        &:nth-child(4){
          // position
          position: absolute;
          bottom: 20%;
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

  &-content{
    // size
    width: 100%;
    height: 50%;

    // display
    @include flexbox(column);

    .container-data{
      // size
      width: 50%;
      height: 80%;

      // display
      @include flexbox(column);

      // decoration
      border-radius: 20px;
      background-color: $h-c-gray;

      div{
        // size
        width: 100%;
        height: 33.33%;

        // display
        @include flexbox();

        // decoration

        label{
          // size
          width: 50%;
          height: 100%;

          // display
          @include flexbox();

          // decoration
        }

        span{
          // size
          width: 50%;
          height: 100%;

          // display
          @include flexbox();
        }
      }
    }

    .container-button{
      // size
      width: 50%;
      height: 20%;

      // display
      @include flexbox();

      // decoration
      border-radius: 20px;

      button{
        // margin
        padding: 5px;

        // decoration
        font-family: system-ui, sans-serif;
        font-size: 1.5rem;
        cursor: pointer;
        font-weight: 400;  
        border: none;
        border-radius: 5px;
        // box-shadow: 0 0 0 .1em inset var(--c); 
        --_g: linear-gradient(var(--c) 0 0) no-repeat;
        background: 
          var(--_g) calc(var(--_p,0%) - 100%) 0%,
          var(--_g) calc(200% - var(--_p,0%)) 0%,
          var(--_g) calc(var(--_p,0%) - 100%) 100%,
          var(--_g) calc(200% - var(--_p,0%)) 100%;
        background-size: 50.5% calc(var(--_p,0%)/2 + .5%);
        outline-offset: .1em;

        // transition
        transition: background-size .4s, background-position 0s .4s;

        &:hover{
          // transition
          --_p: 100%;
          transition: background-position .4s, background-size 0s;
        }

        &:active{
          // decoration
          box-shadow: 0 0 9e9q inset #0009; 
          background-color: var(--c);
          color: $h-c-white;
        }
      }
    }
  }

  &:has(.is-added){
    opacity: 0.5;
    .container-button{
      button{
        // decoration
        display: none;
      }
    }
  }

  @media screen and (max-width: 1415px){
    // size
    height: 450px;
  }

  @media screen and (max-width: 580px){
    // size
    &-header{
      .container-image{
        width: 70%;
      }
    }

    &-content{
      .container-data{
        width: 70%;
      }
    }
  }
}
</style>