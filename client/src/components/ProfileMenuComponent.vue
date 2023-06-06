<script setup>
import {profileStore} from "@/stores/profile.js";
// store
const profile = profileStore();
// variables
var options = [
  { value: 'info', label: 'Informacion' },
  { value: 'match', label: 'Partidos' },
  { value: 'shop', label: 'Tienda' },
  { value: 'settings', label: 'Ajustes' },
]
function changeComponent(value) {
  profile.acutalComponent = value
}
</script>
<template>
  <section class="menu-profile">
    <div class="container">
      <div v-for="item of options" :class="item.value" v-on:click="changeComponent(item.value)">
        <label>{{ item.label }}</label>
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
      }
      &:hover{
        //decoration
        background-color: $h-c-white;
        label{
          color: $h-c-red-logo;
        }
      }
    }
  }
}
</style>