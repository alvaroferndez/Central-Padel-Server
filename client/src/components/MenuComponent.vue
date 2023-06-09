<script setup>
import { authentificationStore } from "../stores/authentification";
import { toastStore } from "../stores/toast";
import {adminStore} from "../stores/Admin/admin";
import {ref} from "vue";

// stores
const authentification = authentificationStore();
const toast = toastStore();
const admin = adminStore();

// variables
var menu_items = [
  {
    name: 'Inicio',
    link: '/'
  },
  {
    name: 'Perfil',
    link: '/profile'
  },
  {
    name: 'Partidos',
    link: '/match'
  },
  {
    name: 'Tienda',
    link: '/shop'
  },
];

var witdh = ref(window.innerWidth);

window.onresize = () => {
  witdh.value = window.innerWidth;
}

// functions
function logout() {
  if(localStorage.getItem('user') != undefined){
    authentification.logout(JSON.parse(localStorage['user'])).then(() => {
      localStorage.removeItem('user');
      toast.showSuccess('Sesión cerrada');
    });
  }
}

function closeMenu() {
  authentification.menu_status = false;
}

function changeToAdmin(){
  admin.admin_mode = !admin.admin_mode;
  closeMenu();
}
</script>


<template>
  <section class="menu">

    <!-- name -->
    <div class="name">
      <div class="text">
        <p>Iniciado como</p>
        <h3 v-if="authentification.user.name">{{ authentification.user.name }}</h3>
        <h3 v-else >{{ authentification.user.email }}</h3>
      </div>
      <v-icon v-if="witdh <= 600" v-on:click="closeMenu()" name="io-close" scale="2"></v-icon>
    </div>

    <!-- items -->
    <div class="items">
      <div v-for="item of menu_items">
        <router-link v-on:click="closeMenu()" class="link" :to="item.link">{{item.name}}</router-link>
      </div>
      <div>
        <p v-on:click="changeToAdmin()" v-if="authentification.user.admin">Administración</p>
      </div>
    </div>

    <div class="logout" v-on:click="logout()">
      <v-icon name="hi-logout" scale="2" class="button"></v-icon>
    </div>
  </section>
</template>


<style lang="scss">
@import "@/assets/styles.scss";

.menu{
  // size
  min-width: 15%;

  // position
  position: fixed;
  right: 7.5%;
  z-index: 1000;

  // display
  @include flexbox(column, flex-start, space-between);

  // margin
  margin-top: -8vh;

  // decoration
  background-color: $h-c-white;
  border-radius: 15px;
  border: 1px solid $h-c-white-shade;

  // transition
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 1100px) {
    // size
    width: 30%;
    
    // position
    right: 0%;

    // decoration
    border-top-right-radius: 0px;
  }

  @media screen and (max-width: 800px) {
    // size
    width: 100%;
    height: 100vh;
    
    // position
    top: 8vh;
    right: 0%;

    // decoration
    border-radius: 0px;
    overflow-y:hidden;

  }

  // all
  &>* {
    //size
    width: 100%;

    // margin
    padding-bottom: 1rem;
    padding-top: 1rem;

    // decoration
    border-bottom: 1px solid $h-c-white-shade;

    &>*{
      // margin
      padding-left: 1rem;
    }
  }

  // name
  .name{
    // display
    @include flexbox(row, center, space-between);
    overflow: hidden;

    .text{
      @include flexbox(column, flex-start, center);
      overflow: hidden;
    }
  }

  // items
  .items{
    // display
    @include flexbox(column, flex-start, space-between);

    &>* {
      // size
      width: 100%;
      height: 3rem;

      //display
      @include flexbox(column, flex-start, center);

      &:hover{
        // decoration
        background-color: $h-c-red-ligth-tint;
        cursor: pointer;
      }

      &>*{
        // size
        width: 100%;
      }
    }
  }

  // logaout
  .logout{
    // decoration
    border: none;
    border-radius: 15px;

    &:hover{
      cursor: pointer;
      background-color: $h-c-red-ligth-tint;
    }
  }
}
</style>