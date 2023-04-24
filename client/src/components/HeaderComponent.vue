<script setup>
import { authentificationStore } from "../stores/authentification";
import {adminStore} from "../stores/Admin/admin";
import Menu from "./MenuComponent.vue";
import { ref } from "vue";

// stores
const authentification = authentificationStore();
const admin = adminStore();

// variables
var last_scroll = 0;

// styles
window.onscroll = function() {
  var y = window.scrollY;

    // moodify the height of the header
    if (y >= 85) {
      document.getElementById("header").classList.add("header-scrolled");
      document.getElementsByClassName("container-logo")[0].style["grid-row"] = "1 / 4";
      document.getElementsByClassName("container-logo")[0].childNodes[0].style.height = "100%";
      if(document.getElementsByClassName("menu").length > 0){
        if(window.innerWidth > 600){
          document.getElementsByClassName("menu")[0].style.marginTop = "-10vh";
        }
      }
    } else {
      document.getElementById("header").classList.remove("header-scrolled");
      document.getElementsByClassName("container-logo")[0].style["grid-row"] = "2 / 3";
      document.getElementsByClassName("container-logo")[0].childNodes[0].style.height = "200%";

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


function changeToAdmin(){
  admin.admin_mode = !admin.admin_mode;
}

</script>


<template>

    <!-- header -->
    <header id="header">

        <!-- logo container -->
        <div class="container-logo">
            <router-link class="link" to="/">
                <img class="logo" src="@/assets/images/logo.png" alt="Logo Central Padel"/>
            </router-link>
        </div>

        <!-- navigation menu -->
        <nav class="navigation">
            <router-link class="link" to="/">Inicio</router-link>
            <router-link class="link" to="/shop">Tienda</router-link>
            <router-link class="link" to="/match">Partidos</router-link>
            <p class="link" v-on:click="changeToAdmin()" v-if="authentification.user.admin">Administración</p>
        </nav>

        <!-- login -->
        <div class="login-logo hover">
            <router-link v-if="!authentification.user.logged" class="link" to="/login">
                <v-icon name="ri-user-3-fill" scale="1.5"/>
            </router-link>
            <v-icon v-else v-on:click="menuStatus($event)" class="link" name="oi-three-bars" scale="2" />
        </div>
    </header>

    <!-- menu -->
    <Menu class="menu" v-if="authentification.menu_status && authentification.user.logged" />

  <!-- button to scroll to the top -->
    <div class="scrolling-top">
          <a href="#href">
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

        /* logo */
        .container-logo{
            /* position */
            grid-column: 2 / 3;
            grid-row: 2 / 3;

            /* display */
            @include flexbox();

            a{
                /* size */
                height: 200%;
                width: 100%;

                // display
                @include flexbox();

                .logo{
                  /* size */
                  width: 150%;
                  height: 100%;
                }

                @media screen and (max-width: 800px) {
                    /* size */
                    width: 100%;
                    height: 100%;
                }

                @media screen and (min-width: 1100px) {
                    /* size */
                    width: 80%;
                }

                @media screen and (min-width: 1500px) {
                  /* size */
                  width: 60%;
                }
            }
        }

        /* navigation */
        .navigation{
            /* position */
            grid-column: 3 / 7;
            grid-row: 2 / 3;

            /* display */
            @include flexbox();

            /* margin */
            gap: 2rem;
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