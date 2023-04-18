<script setup>
import {profileStore} from "@/stores/profile.js";

// store
const profile = profileStore();

// variables
var options = [
  { value: 'info', label: 'Infor' },
  { value: 'match', label: 'Partiods' },
  { value: 'settings', label: 'Settings' },
  { value: 'shop', label: 'Tienda' }
]

function changeComponent(value) {
  profile.acutalComponent = value
}

</script>


<template>
  <section class="menu-profile">
    <div v-for="item of options" :class="item.value" v-on:click="changeComponent(item.value)">
      <label>{{ item.label }}</label>
    </div>
  </section>

</template>


<style lang="scss">
@import "@/assets/styles.scss";

.menu-profile{
  border: 1px solid black;
  // size
  width: 20%;
  height: 80vh;
}
</style>