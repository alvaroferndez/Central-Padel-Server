<script setup>
import { RouterLink, RouterView,  } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { authentificationStore } from "./stores/authentification";

// stores
const authentification = authentificationStore();

// chech if user is logged
if(localStorage.getItem('user') != null){
  authentification.checkUserLogged(JSON.parse(localStorage['user']));
}



</script>


<template>
  <HeaderComponent />

  <main class="main">
    <RouterView />
  </main>

  <FooterComponent/>
</template>

<style lang="scss">
  .main {
    /* margin */
    margin-top: 20vh;
  }
</style>
