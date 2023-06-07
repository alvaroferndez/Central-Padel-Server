<script setup>
import {profileStore} from "@/stores/profile.js";
import {ref} from 'vue'

// store
const profile = profileStore();


// variables
var options = [
  { value: 'info', label: 'Informacion', icon: 'hi-information-circle' },
  { value: 'match', label: 'Partidos', icon: 'io-tennisball-sharp' },
  { value: 'shop', label: 'Tienda', icon: 'fa-shopping-bag' },
  { value: 'settings', label: 'Ajustes', icon: 'io-settings-sharp' },
]
var media = ref(false);

// functions
function changeComponent(value) {
  profile.acutalComponent = value
}

function setMedia() {
  if(window.innerWidth <= 768) {
    media.value = true;
  }
}

setMedia()
</script>
<template>
  <section class="menu-profile">
    <div class="container">
      <div v-for="item of options" :class="item.value" v-on:click="changeComponent(item.value)">
        <label v-if="!media">{{ item.label }}</label>
        <v-icon class="icon" v-if="media" :name="item.icon" scale="2"></v-icon>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import "@/assets/styles.scss";
.menu-profile{
  // size
  width: 20%;
  height: 100%;

  // display
  @include flexbox(column);

  // descoration
  background-color: $h-c-red-logo-shade;

  .container{
    // size
    width: 80%;
    height: 80%;

    // display
    @include flexbox(column);

    // margin
    margin: 0 !important;

    &>div{
      // size
      width: 80%;
      height: 20%;

      // display
      @include flexbox();

      // margin
      margin-bottom: 10px;

      // decoration
      background-color: $h-c-red-logo;
      border-radius: 10px;
      cursor: pointer;

      label{
        // size
        width: 100%;
        height: 100%;
        // display
        @include flexbox();
        // decoration
        font-size: 1.5em;
        color: $h-c-white;

        @media screen and (max-width: 1100px) {
          font-size: 1em;
        }
      }

      .icon{
        // decoration
        color: $h-c-white;
      }

      &:hover{
        //decoration
        background-color: $h-c-white;

        label, .icon{
          color: $h-c-red-logo;
        }
      }
    }
  }
}
</style>