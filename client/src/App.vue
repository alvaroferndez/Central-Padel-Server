<script setup>
import { RouterLink, RouterView,  } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

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
