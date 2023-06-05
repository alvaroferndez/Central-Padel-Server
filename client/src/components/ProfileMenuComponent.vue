<script setup>
import {profileStore} from "@/stores/profile.js";

// store
const profile = profileStore();

// variables
var options = [
  { value: 'info', label: 'Información' },
  { value: 'match', label: 'Partidos' },
  { value: 'shop', label: 'Tienda' },
  { value: 'settings', label: 'Configuración' },
]

function changeComponent(value) {
  profile.acutalComponent = value
}

</script>


<template>
  <section class="menu-profile">
    <div class="global-container">
      <div class="container">
        <div v-for="item of options" :class="item.value" v-on:click="changeComponent(item.value)">
          <label>{{ item.label }}</label>
        </div>
      </div>
    </div>
  </section>

</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.menu-profile{
  // display
  @include flexbox();

  .global-container{
    // size
    width: 55%;
    height: 80%;

    // display
    @include flexbox();

    // descoration
    background-color: $h-c-red-logo-shade;
    border-radius: 30%;

    .container{
      // size
      width: 80%;
      height: 80%;

      // display
      @include flexbox(column);

      &>div{
        // size
        width: 100%;
        height: 20%;

        // display
        @include flexbox();

        // margin
        margin-bottom: 10px;

        // decoration
        background-color: $h-c-red-logo;
        border-radius: 10px;

        // text
        label{
          // size
          width: 100%;
          height: 100%;

          // display
          @include flexbox();

          // decoration
          font-size: 1.5em;
          color: $h-c-white;
          cursor: pointer;

          @media screen and (max-width: 1300px) {
            font-size: 1.2em;
          }

          @media screen and (max-width: 768px){
            font-size: 1em;
          }
        }

        &:hover{
          //decoration
          background-color: $h-c-white;

          label{
            color: $h-c-red-logo;
          }
        }
      }

      @media screen and (max-width: 600px){
        flex-direction: row;
      }
    }
  
    @media screen and (max-width: 1000px){
      width: 65%;
    }

    @media screen and (max-width: 768px){
      width: 75%;
    }

    @media screen and (max-width: 600px){
      width: 100%;
    }
  }
}
</style>