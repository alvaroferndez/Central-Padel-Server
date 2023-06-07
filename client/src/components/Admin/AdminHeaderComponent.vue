<script setup>
import { authentificationStore } from "../../stores/authentification";
import {adminStore} from "../../stores/Admin/admin";
import Menu from ".././MenuComponent.vue";

// stores
const authentification = authentificationStore();
const admin = adminStore();

// variables
var last_scroll = 0;
var options = [
  { value: 'users', label: 'Usuarios' },
  { value: 'matchs', label: 'Partidos' },
  { value: 'shops', label: 'Tienda' },
]

// styles
window.onscroll = function() {
  var y = window.scrollY;

  // moodify the height of the header
  if (y >= 85) {
    document.getElementById("header").classList.add("header-scrolled");
    if(document.getElementsByClassName("menu").length > 0){
      if(window.innerWidth > 600){
        document.getElementsByClassName("menu")[0].style.marginTop = "-10vh";
      }
    }
  } else {
    document.getElementById("header").classList.remove("header-scrolled");
    if(document.getElementsByClassName("menu").length > 0){
      if(window.innerWidth > 600){
        document.getElementsByClassName("menu")[0].style.marginTop = "-8vh";
      }
    }
  }

  // show the button to scroll to the top
  if(window.innerWidth <= 600 && authentification.menu_status){
    document.getElementsByClassName("scrolling-top")[0].style.display = "none";
  }else{
    if (y > 143) {
      document.getElementsByClassName("scrolling-top")[0].style.display = "flex";
    } else {
      document.getElementsByClassName("scrolling-top")[0].style.display = "none";
    }

    if(y < last_scroll){
      document.getElementsByClassName("scrolling-top")[0].style.visibility = "visible";
    }else{
      document.getElementsByClassName("scrolling-top")[0].style.visibility = "hidden";
    }
  }


  last_scroll = y;
};

// functions
function menuStatus(e){
  e.stopPropagation();
  authentification.menu_status = !authentification.menu_status
  if(authentification.menu_status) {
    setTimeout(() => {
      if(window.innerWidth > 600){
        if (window.scrollY < 85) {
          document.getElementsByClassName("menu")[0].style.marginTop = "-8vh";
        } else {
          document.getElementsByClassName("menu")[0].style.marginTop = "-10vh";
        }
      }else{
        document.getElementsByClassName("scrolling-top")[0].style.display = "none";
      }
    }, 1);
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function changeToAdmin(){
  admin.admin_mode = !admin.admin_mode;
}



</script>


<template>

  <!-- header -->
  <header id="header">

    <!-- navigation menu -->
    <nav class="navigation">
      <p class="link hover" v-for="option of options" v-on:click="admin.changeActualComponent(option.value)">{{option.label}}</p>
      <p class="link hover admin-admin" v-on:click="changeToAdmin()" v-if="authentification.user.admin">Modo usuario</p>
    </nav>

    <!-- login -->
    <div class="login-logo hover">
      <router-link v-if="!authentification.user.logged" class="link" to="/login">
        <v-icon name="ri-user-3-fill" scale="1.5"/>
      </router-link>
    </div>
  </header>

  <!-- button to scroll to the top -->
  <div class="scrolling-top" @click="scrollToTop()">
    <a >
      <v-icon name="bi-arrow-up" scale="2" />
    </a>
  </div>

</template>


<style lang="scss">
@import "@/assets/styles.scss";

/* header */
header{
  /* size */
  width: 100%;
  height: 15vh;

  /* position */
  position: fixed;
  top: 0;
  z-index: $h-z-index-header;

  /* display */
  display: grid;
  grid-template-columns: 8% repeat(6, 1fr) 8%;
  grid-template-rows: 25% 50% 25%;
  justify-content: center;
  align-content: center;

  /* margin */
  padding-top: 3vh;

  /* trnasitions */
  transition: height, padding-top 0.4s ease;

  /* navigation */
  .navigation{
    /* position */
    grid-column: 3 / 7;
    grid-row: 2 / 3;

    /* display */
    @include flexbox();

    /* margin */
    gap: 2rem;

    .admin-admin{
      padding: .5em;

      color: $h-c-black;
      border-radius: 20px;

      // transitions
      transition: all 0.3s ease;

      &:hover{
        background: $h-c-dark-gray-shade;
        color: $h-c-white;

        // transitions
        transition: all 0.5s ease;
      }
    }
  }

  /* login */
  .login-logo{
    /* position */
    grid-column: 7 / 8;
    grid-row: 2 / 3;

    /* display */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


}

.header-scrolled{
  /* size */
  height: 10vh;

  /* margin */
  padding-top: 0;

  /* decoration */
  box-shadow: 0 0.5rem 1rem 0 #15151e14;
  background-color: $h-c-white;

  /* transitions */
  transition: height, padding-top 0.4s ease, background-color 0.3s ease;
}

.scrolling-top{
  // size
  width: 50px;
  height: 50px;

  // position
  position: fixed;
  top: 11vh;
  right: 48.5%;
  z-index: 1000;

  // display
  display: none;
  align-items: center;
  justify-content: center;

  // decoration
  border-radius: 50%;
  border-bottom: 3px solid $h-c-white-shade;
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,212,255,0) 77%);

  a{
    span{
      // decoration
      font-size: 2rem;
    }
  }

  @include mediaLoginWidth(1100px,50px,47%,50px,11vh);
  @include mediaLoginWidth(600px,50px,45%,50px,11vh);
  @include mediaLoginWidth(400px,50px,43%,50px,11vh)
}
</style>