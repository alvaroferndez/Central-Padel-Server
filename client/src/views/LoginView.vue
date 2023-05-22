<script setup>
import {ref} from "vue";
import { authentificationStore } from "../stores/authentification";
import { toastStore} from "../stores/toast";
import { routerStore } from "../stores/router";


AOS.init();

// header and footer
setTimeout(() => {
  document.getElementById('header').style.display = 'none';
  document.getElementById('footer').style.display = 'none';
  document.getElementsByClassName('main')[0].style.marginTop = '0';
}, 10);

// stores
const authentification = authentificationStore();
const toast = toastStore();
const router = routerStore();

// variables
const email = ref('');
const password = ref('');


// functions
function login(e) {
  e.preventDefault();
  authentification.login(email.value, password.value).then(() => {
    if(authentification.user != undefined){
      localStorage.setItem('user', JSON.stringify(authentification.user.email));
      toast.showSuccess('Login correcto');
      router.navigateTo('/')
    }else{
      toast.showError('Login incorrecto');
    }
  });
}

</script>

<template>
  <div class="global-container" data-aos="fade-up">
  </div>
  <div class="login-container" data-aos="fade-down">
  </div>
  <div class="login">
    <h1 class="title">Login</h1>
    <form>
      <div class="email">
        <input type="email" id="email" placeholder="correo" v-model="email"/>
      </div>
      <div class="password">
        <input type="password" id="password" placeholder="contraseña" v-model="password"/>
      </div>
      <button class="button" type="submit" v-on:click="login($event)">Login</button>
    </form>
    <div class="others-logins">
      <i class="fa-brands fa-google hover"></i>
      <i class="fa-brands fa-facebook hover"></i>
    </div>
    <div class="options">
      <router-link class="hover" to="/sign-in">Crear cuenta</router-link>
      <router-link class="hover" to="/password">¿Has olvidado tu contraseña?</router-link>
    </div>
    <router-link class="hover return" to="/">Volver al inicio</router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container{
  // size
  width: 100%;
  height: 100vh;

  background-image: url('@/assets/images/login-image.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  filter:brightness(0.7);
}

.login-container{
  border: 1px solid $h-c-gray;
  // size
  height: 70%;
  width: 35%;

  // position
  z-index: 10;
  position: absolute;
  top: 15%;
  right: 33%;

  // display
  @include flexbox();

  // decoration
  background-color: rgba(0,0,0,0.5);
  filter: blur(1.5px);
  border-radius: 40px;

  @include mediaLoginWidth(1330px, 50%, 25%, 70%, 15%);
  @include mediaLoginWidth(864px, 70%, 15%, 60%, 20%);
  @include mediaLoginWidth(500px, 90%, 5%, 60%, 20%);
}

.login{
  // size
  width: 25%;
  height: 40%;

  // position
  position: absolute;
  top: 30%;
  right: 37.5%;
  z-index: 20;

  // display
  @include flexbox(column, center, space-between);

  // decoration
  background-color: transparent;
  border-radius: 15px;

  *{
    color: $h-c-white;
  }

  .title{
    // size
    width: 90%;
    height: 10%;

    // decoration
    text-align: center;
    color: $h-c-white;
    -webkit-text-stroke: 2px $h-c-red-ligth-shade;
  }

  form{
    // size
    width: 90%;
    height: 50%;

    // display
    @include flexbox(column, center, center, 1rem);

    div{
      // size
      width: 100%;
      height: 20%;

      // display
      @include flexbox();

      input{
        // size
        width: 100%;
        height: 100%;

        // margin
        padding: 0 0.5rem;

        // decoration
        border: none;
        background-color: transparent;
        outline: none;

        &:focus{
          // decoration
          border-bottom: 2px solid $h-c-white;
        }

      }
    }
  }

  .button {
      // size
      width: auto;
      height: auto;

      // position
      position: relative;

      // display
      display: inline-block;

      // margin
      padding: 13px 23px;
      margin: 0;

      // decoration
      background-color: $h-c-white;
      border-radius: 8px;
      box-sizing: border-box;
      color: $h-c-black;
      cursor: pointer;
      font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;
      font-weight: 600;
      outline: none;
      text-align: center;
      text-decoration: none;
      border: none;

      &:focus-visible{
          // decoration
          box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;

          // transition
          transition: box-shadow .2s;
      }

      &:active{
          // decoration
          background-color: $h-c-gray;
          transform: scale(.96);
      }

      &:disabled{
          // decoration
          background-color: $h-c-gray;
          color: $h-c-white;
          cursor: not-allowed;
          opacity: 1;
      }
  }

  .others-logins, .options{
    // size
    width: 90%;
    height: 10%;

    // display
    @include flexbox(row, center, space-around);
  }

  .options{
      @media screen and (max-width: 1500px) {
        // size
        height: 20%;

        // display
        flex-direction: column;
      }
  }

  .return{
    // size
    width: 90%;
    height: 10%;

    // decoration
    text-align: center;
    color: $h-c-red-ligth;
  }

  @include mediaLoginWidth(1330px, 40%, 30%, 40%, 30%);
  @include mediaLoginWidth(864px, 60%, 20%, 40%, 30%);
  @include mediaLoginWidth(500px, 80%, 10%, 40%, 30%);
  @include mediaLoginHeight(700px, 50%, 25%);
}
</style>