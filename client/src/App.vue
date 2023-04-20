<script setup>
import { RouterLink, RouterView,  } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import AdminHeaderComponent from './components/Admin/AdminHeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import AdminView from './views/Admin/AdminView.vue';
import { authentificationStore } from "./stores/authentification";
import {adminStore} from "./stores/Admin/admin";

// stores
const authentification = authentificationStore();
const admin = adminStore();

// chech if user is logged
if(localStorage.getItem('user') != null){
  authentification.checkUserLogged(JSON.parse(localStorage['user']));
}
</script>


<template>
  <div v-if="!admin.admin_mode">
    <HeaderComponent />

    <main class="main">
      <RouterView />
    </main>

    <FooterComponent/>
  </div>
  <div v-else>
    <AdminHeaderComponent />
    <main class="admin-main">
      <AdminView/>
    </main>
  </div>
</template>

<style lang="scss">
  .main, .admin-main {
    /* margin */
    margin-top: 20vh;
  }
</style>
